ManageIQ.angular.app.component('widgetChart', {
  bindings: {
    widgetId: '@',
    widgetModel: '<',
  },
  controllerAs: 'vm',
  template: `
    <div class="blank-slate-pf " style="padding: 10px" ng-if="vm.widgetModel.state === 'no_data'">
      <div class="blank-slate-pf-icon">
        <i class="fa fa-cog"></i>
      </div>
      <h1>
        ${__('No chart data found.')}
      </h1>
    </div>
    <div class="blank-slate-pf " style="padding: 10px" ng-if="vm.widgetModel.state === 'invalid'">
      <div class="blank-slate-pf-icon">
        <i class="fa fa-cog"></i>
      </div>
      <h1>
        ${__('Invalid chart data.')}
      </h1>
      <p>
        ${__('Invalid chart data. Try regenerating the widgets.')}
      </p>
    </div>
    <div ng-if="vm.widgetModel.state === 'valid'">
      <div ng-bind-html="vm.widgetModel.content"></div>
    </div>
  `,
});