import React from 'react';
import classnames from 'classnames';

export default React.createClass({
	getInitialState() {
		return {
			editing: false
		};
	},
	handleDoubleClick() {
		this.setState({ editing: true })
	},
	handleSave(text) {
		this.setState({ editing: false });
		if (text.length) {
			this.props.editItem(this.props.item.id, text);
		} else {
			this.props.removeItem(this.props.item.id);
		}
	},
	handleSubmit(e) {
		if (e.which === 13) {
			this.handleSave(e.target.value.trim());
		}
	},
	handleBlur(e) {
		this.handleSave(e.target.value.trim());
	},
	render() {
		const { item, toggleItem, removeItem } = this.props;
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
					       onChange={() => toggleItem(item.id)} />
					<label onDoubleClick={this.handleDoubleClick}>
						{item.text}
					</label>
					<button className="destroy" onClick={() => removeItem(item.id)} />
				</div>
				<input className='edit'
				       defaultValue={item.text}
				       onBlur={this.handleBlur}
				       onKeyDown={this.handleSubmit} />
			</li>
		);
	}
});
