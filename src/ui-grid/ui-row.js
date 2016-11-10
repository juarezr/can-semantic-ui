import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import stache from 'can-stache';
import canViewModel from "can-view-model";

import gridUtil from './gridutil';

const UiRowViewModel = DefineMap.extend({
    classes: {
        type: "string",
    },
    visible: {
        value: true,
        type: 'boolean',
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
    centered: {
        value: false,
        type: 'boolean'
    },
    doubling: {
        value: false,
        type: 'boolean'
    },
    stretched: {
        value: false,
        type: 'boolean'
    },

    getClasses: function() {

        if (!this.visible) {
            return 'hidden';
        }
        
        var res = '';

        if (this.verticalAlign) {
            res = this.verticalAlign + ' aligned';
        }

        if (this.textAlign) {
            if (this.textAlign === 'justified') {
                res = res + ' justified';
            } else {
                res = res + ' ' + this.textAlign + ' aligned';
            }
        }

        if (this.doubling) {
            res = res + ' doubling';
        }

        if (this.span === 'auto') {
            res = res + ' equal width';
        } else if (this.span) {
            var wide = gridUtil.toEnglish(this.span);
            if (wide) {
                res = res + ' ' + wide + ' column';
            }
        }

        if (this.centered) {
            res = res + ' centered';
        }

        if (this.stretched) {
            res = res + ' stretched';
        }

        if (this.color) {
            res = res + ' ' + this.color;
        }

        res = res + ' row';

        if (this.classes) {
            res = res + ' ' + this.classes;
        }
        return res;
    },
});

export default Component.extend({
    tag: 'ui-row',
    ViewModel: UiRowViewModel,
    view: stache("{{#if visible}}<content></content>{{else}}<!-- ui-row -->{{/if}}"),
    events: {
        inserted: function() {
            var el = this.element;
            var vm = canViewModel(el);
            var cl = vm.getClasses();
            el.className = cl;
        },
    },
});
