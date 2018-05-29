import MyButton from "../my-button/component";
import templ from '../my-button/template';

export default class MySecondButton extends MyButton {
	constructor() {
		super(...arguments);
		this.layout = templ;
	}
}

// // ts class
// export default class MySecondButton extends MyButton {
// 	layout = templ;
// }
