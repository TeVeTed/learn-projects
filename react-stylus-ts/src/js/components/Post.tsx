import React from 'react';

import { Link } from '@reach/router';

import { changePriority } from "../actions";
import { Store } from '../store';
import { IItemObject } from '../types';

import { PRIORITY_LIMITS } from "../constants/action-types";

interface IProps {
	value: IItemObject,
	id: number
}

const Post = (props: IProps) => {
	const { dispatch } = React.useContext(Store);

	const
		[priorityChanging, setPriorityChanging] = React.useState(false),
		[newPriority, setNewPriority] = React.useState<string | null>(null);

	const handleClick = () => setPriorityChanging(!priorityChanging);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (newPriority) {
			changePriority(
				dispatch,
				{
					id: props.id,
					oldPriority: props.value.priority,
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
					Change priority {props.value.priority}
				</button>
		);
	}

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
									defaultChecked={i === props.value.priority}
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
	};

	return (
		<div className='news-item'>
			<div className="news-item-img">
				<img src={props.value.urlToImage} alt='' width='280' height='280' className='img-item' />
			</div>
			<div className="news-item-bg">
				<h3 className="title small-title">
					<Link to={`/article/${props.id}`} className="title-link">
						{props.value.title}
					</Link>
				</h3>
				<div className="desc">
					{priorityChanging ? Select() : Button()}
				</div>
			</div>
		</div>
	)
};

export default Post;