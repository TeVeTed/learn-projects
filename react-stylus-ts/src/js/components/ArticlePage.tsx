import React from 'react';

import { Link, RouteComponentProps } from "@reach/router";

import { changePriority } from "../actions";
import { Store } from '../store';

import { PRIORITY_LIMITS } from "../constants/action-types";

const defaultArticle = {
	author: 'Undefined',
  	description: 'Undefined',
  	priority: 0,
  	source: {
		  id: 0,
		  name: 'Undefined'
	  },
  	title: 'Undefined',
  	urlToImage: 'Undefined',
};

interface IProps extends RouteComponentProps {
	index?: number;
}

const ArticlePage: React.FC<IProps> = props => {
	const { state, dispatch } = React.useContext(Store);

	const
		[priorityChanging, setPriorityChanging] = React.useState<boolean>(false),
		[newPriority, setNewPriority] = React.useState<string | null>(null);

	const handleClick = () => setPriorityChanging(!priorityChanging);

	const article = props.index ? state.remoteNews[props.index] : defaultArticle;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (newPriority && props.index) {
			changePriority(
				dispatch,
				{
					id: props.index,
					oldPriority: article.priority,
					newPriority: Number(newPriority)
				}
			);
			setNewPriority(null);
		}
		setPriorityChanging(!priorityChanging);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewPriority(event.target.value);

	const Button = () => {
		return (
			<button className='button' onClick={handleClick}>
				Change priority {article.priority}
			</button>
		);
	};

	const Select = () => {
		const radioSet = [];

		for (let i = PRIORITY_LIMITS.MAX_PRIORITY; i <= PRIORITY_LIMITS.MIN_PRIORITY; i++) {
			radioSet.push(
				<li key={i} className='priority-radio'>
					<label
						htmlFor={'articlePriority' + i}
						className='checkbox-container'
					>
						<span className='label-title'>{i}</span>
						<input
							onChange={handleChange}
							type="radio"
							name="articlePriority"
							value={i}
							defaultChecked={i === article.priority}
							id={'articlePriority' + i}
							className='checkbox-button'
						/>
						<span className="checkmark" />
					</label>
				</li>
			);
		}
		return (
			<form onSubmit={handleSubmit}>
				<ul className='prioriry-list'>
					{radioSet}
				</ul>
				<button type='submit' className='button'>Change</button>
			</form>
		);
	}

	return (
		<div className="article-sec">
			<div className="block-wrapper">
				<div className="block-column">
					<div className="article">
						<div className="half-place art-img">
							<img src={article.urlToImage} alt="" width='570' height='570' className="main-img"/>
						</div>
						<div className="half-place art-more">
							<div className="info">
								<h2 className="sec-title middle-title">
									{article.title}
								</h2>
								<p className="desc">
									{article.description}
								</p>
							</div>
							<div className="add-info">
								<div className="add-info-item">
									<span>Source</span>
									<p className="add-info-title">{article.source.name}</p>
								</div>
								<div className="add-info-item">
									<span>Author(s)</span>
									<p className="add-info-title">{article.author}</p>
								</div>
								<div className="add-info-item">
									{priorityChanging ? Select() : Button()}
								</div>
							</div>
							<div className='returning-link'><Link to='/'>Return to feed >>></Link></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default ArticlePage;