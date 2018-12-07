var View = {
  currentView : false,
  switch : function(view) {

    // clear any validation
    Validate.clearForm();

    // update current view
    View.currentView = view;

    // hide current views
    $('body').addClass(view);
    $('.page--active').removeClass('page--active');
    $('#' + view).addClass('page--active');
  }
}
