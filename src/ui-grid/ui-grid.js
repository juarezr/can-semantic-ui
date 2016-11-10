import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import stache from 'can-stache';
import canViewModel from "can-view-model";

import gridUtil from './gridutil';

const UiGridViewModel = DefineMap.extend({
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
            var isValid = val === 'auto';
            if (!isValid && val) {
                isValid = Number.isSafeInteger(val);
            }

            return isValid ? val : null;
        }
    },
    type: {
        value: null,
        type: function(val) {
            var allowed = ['divided', 'vertically divided', 'celled', 'internally celled'],
                isValid = allowed.indexOf(val);

            return isValid ? val : null;
        }
    },
    padding: {
        value: null,
        type: function(val) {
            var allowed = ['padded', 'vertically padded', 'horizontally padded', 'relaxed'],
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
    reverse: {
        value: false,
        type: 'boolean'
    },
    stackable: {
        value: false,
        type: 'boolean'
    },
    container: {
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

        if (this.span === 'auto') {
            res = res + ' equal width';
        } else if (this.span) {
            var wide = gridUtil.toEnglish(this.span);
            if (wide) {
                res = res + ' ' + wide + ' column';
            }
        }

        if (this.type) {
            res = res + ' ' + this.type;
        }

        if (this.padding) {
            res = res + ' ' + this.padding;
        }

        if (this.centered) {
            res = res + ' centered';
        }

        res = 'ui' + res + ' grid';

        if (this.container) {
            res = res + ' container';
        }

        if (this.classes) {
            res = res + ' ' + this.classes;
        }
        return res;
    },
});

export default Component.extend({
    tag: 'ui-grid',
    ViewModel: UiGridViewModel,
    view: stache("{{#if visible}}<content></content>{{else}}<!-- ui-grid -->{{/if}}"),
    events: {
        inserted: function() {
            var el = this.element;
            var vm = canViewModel(el);
            var cl = vm.getClasses();
            el.className = cl;
        },
    },
});