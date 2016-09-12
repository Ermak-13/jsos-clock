var Widget = require('./widget'),
    Shortcut = require('./shortcut'),
    locales = require('./locales');

global.I18n.registryDict(locales);
OS.installModule('Clock', {
  Widget: Widget,
  Shortcut: Shortcut
});
