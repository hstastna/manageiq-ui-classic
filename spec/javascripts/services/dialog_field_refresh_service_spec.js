describe('dialogFieldRefreshService', function() {
  var testDialogFieldRefreshService, miqService;

  beforeEach(module('ManageIQ'));

  beforeEach(inject(function(dialogFieldRefreshService, _miqService_) {
    testDialogFieldRefreshService = dialogFieldRefreshService;
    miqService = _miqService_;

    var responseResult = {
      result: {
        'the field': 'the results'
      }
    };

    spyOn(miqService, 'jqueryRequest').and.callFake(function() {
      return {then: function(response) { response(responseResult); }};
    });
  }));

  describe('#refreshField', function() {
    var data = 'the data';
    var field = 'the field';
    var url = 'url';
    var idList = {
      dialogId: '123',
      resourceActionId: '321',
      targetId: '456',
      targetType: 'service_template',
    };

    var refreshPromise;
    var resolvedValue;

    beforeEach(function(done) {
      refreshPromise = testDialogFieldRefreshService.refreshField(data, field, url, idList);

      refreshPromise.then(function(value) {
        resolvedValue = value;
        done();
      });
    });

    it('returns a promise', function() {
      expect(refreshPromise instanceof Promise).toBe(true);
    });

    it('uses a jqueryRequest', function() {
      var requestData = {
        action: 'refresh_dialog_fields',
        resource: {
          dialog_fields: 'the data',
          fields: 'the field',
          resource_action_id: '321',
          target_id: '456',
          target_type: 'service_template',
        }
      };

      expect(miqService.jqueryRequest).toHaveBeenCalledWith('url123', {
        data: JSON.stringify(requestData),
        dataType: 'json'
      });
    });

    it('resolves the promise with the results', function() {
      expect(resolvedValue).toEqual('the results');
    });
  });
});