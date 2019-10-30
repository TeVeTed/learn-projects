import React from 'react';

import { Store } from '../store';
import { filteredPriorities } from '../actions';

const Filter = () => {
	const { state, dispatch } = React.useContext(Store);

	const handleChange = source => {
		const
				checkboxes = document.getElementsByName('priority'),
				checkboxesArr = Array.from(checkboxes),
				checkboxAll = document.getElementById('checkbox0');

		if (source.target === checkboxAll) {
			for (let i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = source.target.checked;
			}
		} else {
			checkboxAll.checked = checkboxesArr.every(item => item.checked);
		}

		const filtered = checkboxesArr.filter(item => item.checked);

		filteredPriorities(dispatch, filtered.map(item => item.value));
	};

	const
			priorArr = Object.keys(state.priorities),
			listItems = priorArr.map((item, i) => {
				return (
						<li key={i} className="filter-list-item">
							<label className='checkbox-container'> {item} ({state.priorities[item].length})
								<input
										type="checkbox"
										name='priority'
										id={"checkbox" + item}
										value={item}
										className="checkbox-hidden"
										defaultChecked
								/>
								<span className="checkmark"></span>
							</label>
						</li>
				);
			}),
			totalArticles = priorArr.reduce((prev, cur) => prev + state.priorities[cur].length, 0);

	return (
		<div className="filter-wrapper">
			<input type="checkbox" id="filter-checker"/>
			<div className="filter-block">
				<div className="visible-arrow" title="Toggle filters block">
					<label htmlFor='filter-checker' className='arrow-label'>
						<i className="fa fa-angle-right toggle-filters"></i>
					</label>
				</div>
				<div className="filter-container">
					<form onChange={handleChange} className="filter-form">
						<ul className="filter-list">
							<li className="filter-list-item">
								<label className='checkbox-container'>Select all ({totalArticles})
									<input
											type="checkbox"
											id="checkbox0"
											className="checkbox-hidden"
											defaultChecked
									/>
									<span className="checkmark"></span>
								</label>
							</li>
							{listItems}
						</ul>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Filter;