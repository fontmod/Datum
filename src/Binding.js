define([
	"CallbackBinder",
	"TextBinding",
	"ValueBinding",
	"EventsBinding",
	"InitBinding",
	"UpdateBinding",
	"VisibleBinding",
	"DestroyBinding",
	"ClassesBinding"
], function Binding(
	CallbackBinder,
	TextBinding,
	ValueBinding,
	EventsBinding,
	InitBinding,
	UpdateBinding,
	VisibleBinding,
	DestroyBinding,
	ClassesBinding) {

	function Binding(callbacks) {

		var bindings = [];

		if (callbacks.text) {

			bindings.push(new CallbackBinder(new TextBinding(callbacks.text)));
		}

		if (callbacks.value) {

			bindings.push(new CallbackBinder(new ValueBinding(callbacks.value)));
		}

		if (callbacks.click) {

			bindings.push(
				new CallbackBinder(new EventsBinding({ click: callbacks.click })));
		}

		if (callbacks.init) {

			bindings.push(new CallbackBinder(new InitBinding(callbacks.init)));
		}

		if (callbacks.update) {

			bindings.push(new CallbackBinder(new UpdateBinding(callbacks.update)));
		}

		if (callbacks.destroy) {

			bindings.push(new CallbackBinder(new DestroyBinding(callbacks.destroy)));
		}

		if (callbacks.visible) {

			bindings.push(new CallbackBinder(new VisibleBinding(callbacks.visible)));
		}

		if (callbacks.events) {

			bindings.push(new CallbackBinder(new EventsBinding(callbacks.event)));
		}

		if (callbacks.classes) {

			bindings.push(new CallbackBinder(new ClassesBinding(callbacks.css)));
		}

		var parentModel = null;

		this.applyBinding = function(scope, name, model) {

			parentModel = model;

			for (var i = 0; i < bindings.length; i++) {

				bindings[i].applyBinding(scope, name, model);
			}
		};

		this.removeBinding = function() {

			for (var i = 0; i < bindings.length; i++) {

				bindings[i].removeBinding();
			}
		};

		var test = {};

		Object.keys(callbacks).forEach(function(key) {

			test[key] = function(element) {

				callbacks[key].call(parentModel, element);
			};
		});

		this.test = test;
	}

	return Binding;
});
