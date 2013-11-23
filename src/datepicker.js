var inkDatepickerOptions = {
  "format": "@dateFormat",
  "cssClass": "@dateCssClass",
  "position": "@datePosition",
  "trigger": "@dateTrigger",
  "onYearSelected": "&onYearSelected",
  "onMonthSelected": "&onMonthSelected",
  "onSetDate": "&onSetDate",
  "validDayFn": "&dateIsValid",
  "startDate": "=startDate",
  "buttons": "@datepickerButtons",
  "dateRangeStart": "=dateRangeStart",
  "dateRangeEnd": "=dateRangeEnd",
  "startWeekDay": "#dateStartWeekday"
};

//@directive inkDatepicker
var inkDatepicker = ['$ink', '$http', '$q', function($ink, $http, $q) {
  return {
    restrict: "AC",
    require: "?ngModel",
    link: function($scope, $element, $attr, ngModel) {
      Ink.requireModules(['Ink.UI.DatePicker_1'], function(Datepicker) {
        var options = $ink.options(inkDatepickerOptions, $element, $attr, $scope),
            target = $element[0],
            onSetDate = options.onSetDate,
            onMonthSelected = options.onMonthSelected,
            onYearSelected = options.onYearSelected,
            validDayFn = options.validDayFn;

        if (!options.trigger) {
          options.trigger = "focus";
        }
        switch (options.trigger) {
        case 'focus':
          options.onFocus = true;
          break;
        }
        var buttons = options.buttons && options.buttons.split("|");
        buttons && angular.forEach(buttons, function(name) {
          switch(name) {
          case 'close':
            options.showClose = true;
            break;
          case 'clean':
            options.showClean = true;
            break;
          case 'all':
            options.showClose = options.showClean = true;
            break;
          }
        });
        options.onSetDate = function() {
          console.log(arguments);
          if (onSetDate) {
            onSetDate();
          }
        }
        $element.data('$ink.datepicker', new Datepicker(target, options));
      });
    }
  };
}];
