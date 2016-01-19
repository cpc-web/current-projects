// these scripts can definitely be consolidated -- no need for both functions for email capture
// would be a good project for new js developer

// begin scripts for email capture lightbox
(function($){
  $(function() {
    // REGISTER MODAL SCRIPTS
    var cookieValue = readCookie('cpc-2016');
    var submittedFlag = false;
    if (cookieValue == 'success' || cookieValue == 'close') {
      console.log('cookie: ', cookieValue); // cookie exists
    } else {
      $('#captureModal').modal('show').on('hidden.bs.modal', function () {
        if (!submittedFlag) {
          console.log('fired close function form NOT submitted...');
          setCookie("cpc-2016", "close", 30);
        } else {
          console.log('fired close function WITH form submitted...');
        }
      });
    }
    var urlFull = document.location.href;

    function submitRegistration() {
      if ( $('#lbox_register_form').valid() ) {
        $('#formSubmit').hide();
        //$('#memLoader').css('opacity', '0.5').show().center();
        var myForm = $('#lbox_register_form');
        var myData = 'method=submitSurvey&survey_id=4520';
        luminateExtend.api({
          api: 'survey',
          requestType: 'POST',
          data: myData,
          form: myForm,
          requiresAuth: 'true',
          callback: function(data){
            console.log(data);
            //alert('success='+data.submitSurveyResponse.success);
            if (data.submitSurveyResponse.success == 'true') {
              $('#memLoader').hide();
              // change login box on successful form submission
              $('[id^="login_box"]').html('<div id="login_box_w"><div class="welcome">Welcome!</div><div class="welcome_menu"><a class="menu_link" href="http://support.centralparknyc.org/site/UserLogin?logout=1&NEXTURL='+urlFull+'">Logout </a> | <a class="menu_link" href="https://secure2.convio.net/cpc/site/ConsProfileUser">Profile </a> | <a class="menu_link" href="https://secure2.convio.net/cpc/site/ConsInterestsUser/?tabID=interests">Preferences </a></div></div>');
              $('#note').html('&nbsp;');
              var thankStyles = {
                fontSize: '2em',
                top: '300px'
              };
              $('.captureCopy').html('<p>Thank you! You’re now signed up to receive email from Central Park Conservancy.</p>').css(thankStyles);
              setCookie("cpc-2016", "success", 365);
              submittedFlag = true;
              submitOptimizelyEvent('email_signup_lightbox');
              ga('send', 'event', 'Email Sign-up', 'Email Sign-up', 'email_signup_lightbox');
              $('#captureModal').modal('hide');

            } else {
              $('#formSubmit').show();
              //$('#memLoader').hide();
              $('#note').show().html('<p style="color: #F00">'+data.submitSurveyResponse.errors.errorMessage+'<p>');
            }
          }
        });
      } else {
        window.scrollBy(0,-50);
      }
    }

    $(function() {
      /* static and some dynamic validation rules for the registration - only handling front-end validation */
      $('#lbox_register_form').validate({
        rules: {
          'cons_email'    : { 'required': true, 'email': true, 'maxlength' : 50 },
          'cons_zip_code'   : { 'required' : true, 'rangelength' : [5,10] }
        },
        messages: {
          'cons_email'    : { 'required': '* required', 'email': '* please enter a valid email', 'maxlength': '* maximum length 50 characters' },
          'cons_zip_code'   : { 'required' : '* required',
                          'rangelength':  '* must be between 5 and 10 characters'  }
        }
      });
      
      /* STARTUP */
      /* override the HTML form submission so the user remains on the page while the AJAX processing can occur */
      $('#formSubmit').click(function() {
        submitRegistration();
        return false;
      });
      $('#cons_zip_code').keypress(function (e) {
        //alert('key pressed: '+e.which);
        if (e.which == 13) {
          submitRegistration();
          return false;
        }
      })
      
      $('#lbox_register_form').attr('action', 'javascript:void(0);');
      $('.closeModal').click(function() {
        $('#captureModal').modal('hide');
      });
    });
  });
})(jQuery);
// end scripts for email capture lightbox

// begin on-page email capture scripts

var urlFull = document.location.href;

function submitEmail(thisDivID) {
  (function($){
    var myEmail = $('form.'+thisDivID+' input.primaryEmail').val();
    $('input.primaryEmail').val(myEmail);
    var myForm = $('form.'+thisDivID+'');
    var myData = 'method=submitSurvey&survey_id=2621';
    luminateExtend.api({
      api: 'survey',
      requestType: 'POST',
      data: myData,
      form: myForm,
      requiresAuth: 'true',
      callback: function(data){
        console.log(data);
        var successVar = (data.submitSurveyResponse) ? data.submitSurveyResponse.success : '';
        var errorVar = (data.errorResponse) ? data.errorResponse.code : '';
        if(successVar == 'true') {
          var submitOpt = 'email_signup_'+thisDivID;
          submitOptimizelyEvent(submitOpt);
          $('.primaryEmail').hide();
          $('.submitButton').hide();
          $('.noteBox').show().html('<div id="thanksBox">Thank you! To complete your profile, visit our <a href="http://www.centralparknyc.org/cpc-registration.html?show=all" onClick="ga(\'send\', \'event\', \'Link\', \'Click\', \'Tell Us More - EmailWide\', { \'hitCallback\': function() { document.location = \'http://www.centralparknyc.org/cpc-registration.html?show=all\'; }}); return false;">Registration Page.</a></div>');
          ga('send', 'event', 'Email Sign-up', 'Email Sign-up', thisDivID);
        } else {
          if (errorVar == '1734') {
            var s8 = $('#s8').text();
            $('.noteBox').show().html('<p style="color: #F00">This email address already exists; please <a href="http://support.centralparknyc.org/site/UserLogin?NEXTURL='+s8+'">log in</a> to continue.</p>');
            ga('send', 'event', 'Email Sign-up', 'Duplicate Sign-up', thisDivID);
          } else {
            $('.noteBox').show().html('<p style="color: #F00">'+data.submitSurveyResponse.errors.errorMessage+'</p>');
            ga('send', 'event', 'Email Sign-up', 'Failed Sign-up', thisDivID);
          }
        }
      }
    });
  })(jQuery);
}

(function($){ 

  $('form.emailFollowUs').attr('action', 'javascript:void(0);');
  $('form.emailFooter').attr('action', 'javascript:void(0);');

  // initialize page
  $(document).ready(function() {
    // email submission scripts
    $('form.emailFollowUs .submitButton').click(function() {
      submitEmail('emailFollowUs');
    });
    $('form.emailFollowUs .primaryEmail').keypress(function (e) {
      if (e.which == 13) {
        submitEmail('emailFollowUs');
        return false;
      }
    });
    $('form.emailFooter .submitButton').click(function() {
      submitEmail('emailFooter');
    });
    $('form.emailFooter .primaryEmail').keypress(function (e) {
      if (e.which == 13) {
        submitEmail('emailFooter');
        return false;
        
      }
    });
    // end email capture scripts

    //additional functionality for mobile navigation (will remove) and touch 
    // WILL REMOVE
        
    // remove touch=click functionality from main nav on mobile devices
    $('.secondTrigger > a').on('touchstart', function(e) {
      e.preventDefault();
      var myParent = $(this).parent();
      var myNav = myParent.find('.secondNav');
      //alert('fired: this '+this+' - parent '+myParent+' - nav '+myNav);
      $(this).parent().find('.secondnav').toggle();//css('visibility', 'visible');
    });
    
    // show navbar on click on mobile
    $('.navbar-cpc .navbar-header .navbar-toggle').click(function(e) {
      $('#primaryNav').removeClass('hidden-xs');
    });
  });
})(jQuery);

