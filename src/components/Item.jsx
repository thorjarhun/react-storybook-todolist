import React from 'react';
import classnames from 'classnames';
import { ENTER_KEY, ESCAPE_KEY } from '../constants';

export default React.createClass({
	getInitialState() {
		return {
			editing: false
		};
	},
	onDoubleClick() {
		this.setState({ editing: true });
	},
	onKeyDown(e) {
		if (e.which === ENTER_KEY) {
			const text = e.target.value.trim();
			if (text) {
				this.props.editItem(e.target.value.trim());
			} else {
				this.props.clearItem();
			}
			this.setState({ editing: false });
		} else if (e.which === ESCAPE_KEY) {
			e.target.blur();
		}
	},
	onBlur() {
		this.setState({editing: false});
	},
	render() {
		const { item, toggleItem, clearItem } = this.props;
		const { editing } = this.state;
		return (
			<li className={classnames({
        completed: item.completed,
        editing
      })}>
				<div className="view">
					<input className="toggle"
					       type="checkbox"
					       checked={item.completed}
					       onChange={toggleItem} />
					<label onDoubleClick={this.onDoubleClick}>
						{item.text}
					</label>
					<button className="destroy" onClick={clearItem} />
				</div>
				{
					editing &&
					<input className='edit'
					       defaultValue={item.text}
					       onBlur={this.onBlur}
					       onKeyDown={this.onKeyDown}
					       autoFocus/>
				}
			</li>
		);
	}
});
