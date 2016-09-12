(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var Configurator = global.OS.Configurator,
    PositionAndSizeForm = global.OS.PositionAndSizeForm,
    Mixins = global.OS.Mixins,

    settings = require('./settings'),
    TimeConfigsForm = require('./time_configs_form'),
    TimeStylesForm = require('./time_styles_form');

var _Configurator = React.createClass({displayName: "_Configurator",
  mixins: [Mixins.NavHelper, Mixins.ConfiguratorHelper],

  getInitialState: function () {
    return {
      tab: 'timeConfigs'
    };
  },

  getSubmitHandler: function (tab) {
    var handlers = {
      timeConfigs: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this),

      positionAndSize: function(settings) {
        this.props.onSubmit(settings);
      }.bind(this),

      timeStyles: function (timeStyles) {
        var settings = _.clone(this.props.settings);
        settings.timeStyles = timeStyles;
        this.props.onSubmit(settings);
      }.bind(this)
    };

    return handlers[tab];
  },

  getTabs: function () {
    var settings = this.props.settings;

    return {
      timeConfigs: {
        navText: global.I18n.t('clock.time_configs.nav_text'),
        content: function () {
          return (
            React.createElement(TimeConfigsForm, {
              onSubmit:  this.getSubmitHandler('timeConfigs'), 
              settings:  settings }
            )
          );
        }.bind(this) (),
      },

      positionAndSize: {
        navText: global.I18n.t('position_and_size_form.nav_text'),
        content: function () {
          return (
            React.createElement(PositionAndSizeForm, {
              onSubmit:  this.getSubmitHandler('positionAndSize'), 
              settings:  settings }
            )
          );
        }.bind(this) ()
      },

      timeStyles: {
        navText: global.I18n.t('clock.styles.nav_text'),
        content: function () {
          return (
            React.createElement(TimeStylesForm, {
              onSubmit:  this.getSubmitHandler('timeStyles'), 
              settings:  settings.timeStyles}
            )
          );
        }.bind(this) ()
      }
    };
  },

  render: function () {
    return (
      React.createElement(Configurator.DefaultDialog, {
        ref:  this.getRefName(), 
        name:  this.props.name, 
        onClose:  this.props.onClose}, 

         this.getNavHTML(), 

        React.createElement("div", {className: "row", style: { marginTop: '20px'}}, 
          React.createElement("div", {className: "col-md-10 col-md-offset-1"}, 
             this.getContentHTML() 
          )
        )
      )
    );
  }
});

module.exports = _Configurator;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./settings":6,"./time_configs_form":8,"./time_styles_form":9}],2:[function(require,module,exports){
(function (global){
var Widget = require('./widget'),
    Shortcut = require('./shortcut'),
    locales = require('./locales');


global.I18n.registryDict(locales);
OS.installModule('Clock', {
  Widget: Widget,
  Shortcut: Shortcut
});


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./locales":4,"./shortcut":7,"./widget":10}],3:[function(require,module,exports){
var en = {
  'clock.time_configs.nav_text': 'Time Configs',
  'clock.styles.nav_text': 'Styles',

  'clock.format.label': 'format:',
  'clock.updated_interval.label': 'updated interval:',
  'clock.location.label': 'location:',
  'clock.timezone.label': 'timezone:',
  'clock.margin_top.label': 'margin top:',
  'clock.font_size.label': 'font size:'
};

module.exports = en;


},{}],4:[function(require,module,exports){
module.exports = {
  en: require('./en'),
  ru: require('./ru')
};


},{"./en":3,"./ru":5}],5:[function(require,module,exports){
var ru = {
  'clock.time_configs.nav_text': 'Конфиг времени',
  'clock.styles.nav_text': 'Стили',

  'clock.format.label': 'формат:',
  'clock.updated_interval.label': 'интервал обновления:',
  'clock.location.label': 'локация:',
  'clock.timezone.label': 'часовой пояс:',
  'clock.margin_top.label': 'отступ сверху:',
  'clock.font_size.label': 'размер шрифта:'
};

module.exports = ru;


},{}],6:[function(require,module,exports){
(function (global){
var settings = {
  DEFAULT_FORMAT: 'HH:mm',
  DEFAULT_UPDATED_INTERVAL: 60 * 1000,

  DEFAULT_SIZE: {
    width: '150px',
    height: '100px'
  },
  DEFAULT_POSITION: global.Settings.get('default_position'),

  DEFAULT_TIME_STYLES: {
    textAlign: 'center',
    fontSize: '28px',
    marginTop: '10px'
  },

  DEFAULT_LOCATION_STYLES: {
    textAlign: 'center',
    fontSize: '16px'
  }
};

module.exports = settings;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
var Link = OS.Link;

var Shortcut = React.createClass({displayName: "Shortcut",
  render: function () {
    return (
      React.createElement(Link, {
        className:  this.props.className, 
        onClick:  this.props.onClick}, 

        React.createElement("span", {className: "fa fa-clock-o"})
      )
    );
  }
});

module.exports = Shortcut;


},{}],8:[function(require,module,exports){
(function (global){
var HForm = global.OS.HForm,
    Input = global.OS.Input;

var TimeConfigsForm = React.createClass({displayName: "TimeConfigsForm",
  handleSubmit: function (e) {
    e.preventDefault();
    var settings = _.extend(
      _.clone(this.props.settings),
      {
        format: this.refs.format.getValue(),
        updatedInterval: this.refs.updatedInterval.getValue(),
        location: this.refs.location.getValue(),
        timezone: this.refs.timezone.getValue()
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      React.createElement(HForm.Form, {onSubmit:  this.handleSubmit}, 
        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('clock.format.label') }, 

          React.createElement(Input, {
            ref: "format", 
            value:  settings.format}
          )
        ), 

        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('clock.updated_interval.label') }, 

          React.createElement(Input, {
            type: "number", 
            ref: "updatedInterval", 
            value:  settings.updatedInterval}
          )
        ), 

        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('clock.location.label') }, 

          React.createElement(Input, {
            ref: "location", 
            value:  settings.location}
          )
        ), 

        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('clock.timezone.label') }, 

          React.createElement(Input, {
            ref: "timezone", 
            value:  settings.timezone}
          )
        ), 

        React.createElement(HForm.Submit, {value:  global.I18n.t('configurator.submit.value') })
      )
    );
  }
});

module.exports = TimeConfigsForm;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
var HForm = global.OS.HForm,
    Input = global.OS.Input;

var TimeStylesForm = React.createClass({displayName: "TimeStylesForm",
  handleSubmit: function (e) {
    e.preventDefault();
    var settings = _.extend(
      _.clone(this.props.settings),
      {
        marginTop: this.refs.marginTop.getValue(),
        fontSize: this.refs.fontSize.getValue()
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      React.createElement(HForm.Form, {onSubmit:  this.handleSubmit}, 
        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('clock.margin_top.label') }, 

          React.createElement(Input, {
            ref: "marginTop", 
            value:  settings.marginTop}
          )
        ), 

        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('clock.font_size.label') }, 

          React.createElement(Input, {
            ref: "fontSize", 
            value:  settings.fontSize}
          )
        ), 

        React.createElement(HForm.Submit, {value:  global.I18n.t('configurator.submit.value') })
      )
    );
  }
});

module.exports = TimeStylesForm;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
var Widget = global.OS.Widget,
    Mixins = global.OS.Mixins,
    AppDispatcher= global.OS.AppDispatcher,

    settings = require('./settings'),
    Configurator = require('./configurator');

var _Widget = React.createClass({displayName: "_Widget",
  mixins: [Mixins.WidgetHelper],

  getInitialState: function () {
    return {
      _moment: moment(),
      format: settings.DEFAULT_FORMAT,
      updatedInterval: settings.DEFAULT_UPDATED_INTERVAL,

      location: moment.tz.guess(),
      timezone: moment.tz.guess(),

      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION,
      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      timeStyles: settings.DEFAULT_TIME_STYLES,
      locationStyles: settings.DEFAULT_LOCATION_STYLES
    };
  },

  _getSettings: function () {
    return {
      format: this.state.format,
      updatedInterval: this.state.updatedInterval,
      location: this.state.location,
      timezone: this.state.timezone,

      size: _.clone(this.state.size),
      position: _.clone(this.state.position),
      timeStyles: _.clone(this.state.timeStyles),
      locationStyles: _.clone(this.state.locationStyles)
    };
  },

  getTime: function () {
    return this.state._moment
           .tz(this.state.timezone)
           .format(this.state.format);
  },

  refreshInterval: function () {
    this.clearInterval();
    this.setInterval();
  },

  setInterval: function () {
    var intervalId = setInterval(
      this.updateMoment,
      this.state.updatedInterval
    );
    this.setState({ intervalId: intervalId });
  },

  clearInterval: function () {
    clearInterval(this.state.intervalId);
  },

  updateMoment: function () {
    this.setState({
      _moment: moment()
    });
  },

  componentWillMount: function () {
    this.init();
  },

  _load: function (onLoad) {
    this.loadSettings(onLoad);
  },

  componentDidMount: function () {
    this.setInterval();
  },

  componentWillUnmount: function () {
    this.clearInterval();
  },

  render: function () {
    return (
      React.createElement(Widget.Widget, {widgetStyles:  this.getWidgetStyles() }, 
        React.createElement(Widget.DefaultIconsContainer, {
          onMouseDownPositionBtn:  this.handleStartMoving, 
          onClickCloseBtn:  this.close, 
          onClickConfigureBtn:  this.openConfigurator}
        ), 

        React.createElement(Widget.Body, null, 
          React.createElement("div", {style:  this.state.timeStyles}, 
             this.getTime() 
          ), 

           this.getLocationHTML() 
        )

      )
    );
  },

  _createConfigurator: function () {
    return (
      React.createElement(Configurator, {
        name:  this.getName(), 
        settings:  this.getSettings(), 
        onClose:  this.handleCloseConfigurator, 
        onSubmit:  this.handleConfigure}
      )
    );
  },

  _handleConfigure: function (settings) {
    this.setSettings(settings, function () {
      this.refreshInterval();
      this.saveSettings();
    }.bind(this));
  },

  getLocationHTML: function () {
    if (this.state.location) {
      return (
        React.createElement("div", {style:  this.state.locationStyles}, 
           this.state.location
        )
      );
    }
  }
});

module.exports = _Widget;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./configurator":1,"./settings":6}]},{},[2])