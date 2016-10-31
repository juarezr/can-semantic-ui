import QUnit from 'steal-qunit';
import plugin from './can-semantic-ui';

QUnit.module('can-semantic-ui');

QUnit.test('Initialized the plugin', function(){
  QUnit.equal(typeof plugin, 'function');
  QUnit.equal(plugin(), 'This is the can-semantic-ui plugin');
});
