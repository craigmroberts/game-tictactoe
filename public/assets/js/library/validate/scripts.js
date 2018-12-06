var Validate = {
  form : function(form) {

    var length = $(form + ' input:not([type=submit])').length;

    var errors = [];

    // loop through validate inputs
    for (var i = 0; i < length; i++) {
      var input = $(form + ' input:not([type=submit])').eq(i);
      var hasError = Validate.input(input);

      if (hasError) {
        errors[input.attr('name')] = Validate.input(input);
      }
    }

    if (Object.keys(errors).length > 0) {
      // invalid form
      return false;
    }
    return true;
  },

  input : function(el) {

    var value = el.val();
    var name = el.attr('name');
    var type = el.attr('type');
    var errorMessage = false;

    el.removeClass('validate-form--error');
    el.removeClass('validate-form--valid');

    el.next('.validate-form__message').remove();

    // validate email inputs
    if (type === 'email') {

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isEmailValid = re.test(String(value).toLowerCase());

      if (!isEmailValid) {

        errorMessage = 'Enter a valid email address';
      }
    }

    // validate password inputs
    if (type === 'password') {

      if(value.length < 6) {
        errorMessage = 'The password is too short';

      } else if (!/[0-9]/.test(value)) {
        errorMessage = 'Password must contain a number';

      } else if(!/[a-z]/.test(value)) {
        errorMessage = 'Password must contain a lowercase letter';

      } else if(!/[A-Z]/.test(value)) {
        errorMessage = 'Password must contain an uppercase letter';
      }
    }

    // validate required inputs
    if (el.attr('required')) {
      if (value.length <= 0) {
        errorMessage = 'Enter your ' + name;
      }
    }

    if (errorMessage) {
      el.addClass('validate-form--error');
      el.after('<span class="validate-form__message">' + errorMessage + '</span>');
    } else {
      // input is valid
      el.addClass('validate-form--valid');
    }

    return errorMessage;
  }
}

$(document).on('keyup', '.validate-form input', function(e) {
  Validate.input($(this));
});

$(document).on('click', '.validate-check', function(e) {

  var index = $('.validate-form').index($(this).parents('.validate-form'));
  var form = '.validate-form:eq(' + index + ')';

  Validate.form(form);
});
