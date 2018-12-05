var View = {
  currentView : false,
  switch : function(view) {

    // update current view
    View.currentView = view;

    // hide current views
    $('body').addClass(view);
    $('.page.active').removeClass('active');
    $('#' + view).addClass('active');
  }
}
