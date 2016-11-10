import QUnit from 'steal-qunit';
import { UiGridViewModel } from './ui-grid';

// UiGridViewModel unit tests
QUnit.module('can-semantic-ui/ui-grid');

QUnit.test('Has message', function(){
  var vm = new UiGridViewModel();
  QUnit.equal(vm.attr('message'), 'This is the ui-grid component');
});
