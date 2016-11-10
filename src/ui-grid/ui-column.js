import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import stache from 'can-stache';
import canViewModel from "can-view-model";

import gridUtil from './gridutil';

const UiColumnViewModel = DefineMap.extend({
    classes: {
        type: "string",
    },
    visible: {
        value: true,
        type: 'boolean'
    },
    span: {
        value: null,
        type: function(val) {
            var isValid = false;
            if (val) {
                isValid = Number.isSafeInteger(val);
            }

            return isValid ? val : null;
        }
    },
    color: {
        value: null,
        type: function(val) {
            var allowed = ['primary', 'secondary', 'positive', 'negative',
                'red', 'orange', 'yellow', 'olive',
                'green', 'teal', 'blue', 'violet',
                'purple', 'pink', 'brown', 'grey', 'black'],
                isValid = allowed.indexOf(val);

            return isValid ? val : null;
        }
    },
    textAlign: {
        value: null,
        type: function(val) {
            var allowed = ['left', 'right', 'center', 'justified'],
                isValid = allowed.indexOf(val);

            return isValid ? val : null;
        }
    },
    verticalAlign: {
        value: null,
        type: function(val) {
            var allowed = ['middle', 'top', 'bottom'],
                isValid = allowed.indexOf(val);

            return isValid ? val : null;
        }
    },
    floating: {
        value: '',
        type: function(val) {
            var allowed = ['left', 'right'],
                isValid = allowed.indexOf(val);

            return isValid ? val : null;
        }
    },

    getClasses: function() {

        if (!this.visible) {
            return 'hidden';
        }
        var res = '';

        if (this.floating) {
            res = this.floating + ' floated';
        }

        if (this.verticalAlign) {
            res = res + ' ' + this.verticalAlign + ' aligned';
        }

        if (this.textAlign) {
            if (this.textAlign === 'justified') {
                res = res + ' justified';
            } else {
                res = res + ' ' + this.textAlign + ' aligned';
            }
        }

        if (this.span) {
            var wide = gridUtil.toEnglish(this.span);
            if (wide) {
                res = res + ' ' + wide + ' column';
            }
        }

        if (this.color) {
            res = res + ' ' + this.color;
        }

        res = res + ' column';

        if (this.classes) {
            res = res + ' ' + this.classes;
        }
        return res;
    },
});

export default Component.extend({
    tag: 'ui-column',
    ViewModel: UiColumnViewModel,
    view: stache("{{#if visible}}<content></content>{{else}}<!-- ui-column -->{{/if}}"),
    // view: stache("<content></content>"),
    events: {
        inserted: function() {
            var el = this.element;
            var vm = canViewModel(el);
            var cl = vm.getClasses();
            el.className = cl;
        },
    },
});
