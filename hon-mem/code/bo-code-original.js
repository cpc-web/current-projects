[[U8:text/javascript]]
/* Honor Memorial ecard paper Scripts - v3 - 4 December 2013 */
var formHonorEcard = '3802';
var formMemorialEcard = '3803';
var formHonorPaper = '3800';
var formMemorialPaper = '3801';
var addlErrorText = '<span class="error addl-error-text">You may also contact us at 212-310-6672 for assistance from 9:00 am to 5:00 pm, Monday through Friday.</span>';

String.prototype.contains = function(contains) {
    return this.indexOf(contains) != -1 ? true : false;
};

jQuery.fn.center = function () {
    this.parent().css({
      'z-index': '100000',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'width': $(window).width(),
      'height': $(window).height(),
      'opacity': '0.75'
    }).show();

    this.css("position","absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}; 
jQuery.fn.numericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 || 
                key == 9 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

function numbersOnly(e,decimal){
  var key;
  var keychar;
  if(window.event)
     key=window.event.keyCode;
  else if(e)
     key=e.which;
  else
     return true;
  keychar=String.fromCharCode(key);
  if((key==null)||(key==0)||(key==8)||(key==9)||(key==13)||(key==27))
     return true;
  else if((("0123456789").indexOf(keychar)>-1))
     return true;
  else if(decimal&&(keychar==".")) 
    return true;
  else
     return false;
}
/* function to validate the form and submit the data for processing via AJAX */
function processDonationForm() {
  $('#honoreeEmail').val($('#ecardRecipients').val());
  //if ($('#anonymousDonation').attr('checked')=='checked') {
    //$('#annualReportName').val('');
  //}
  if ( $('#donation_form_id').valid() ) {
    $('#btnSubmit').attr('disabled','disabled').css('opacity','0.5');
    $('#memLoader img').center();
    $('#ccApiErrors').hide();
    if ($('#ecardSubject').val().length > 255) {
      $('#ecardSubject').removeClass('valid').addClass('error');
      return false;
    }
    if ($('#ecardMessage').val().length > 255) {
      $('#ecardMessage').removeClass('valid').addClass('error');
      return false;
    }
  if ($('#formID').val() == '3801' || $('#formID').val() == '3800') {
      //alert('paper certificate');
      $('#notificationRecipientFullName').val($('#notify_recipient_first_name').val()+' '+$('#notify_recipient_last_name').val());
  } else {
      //alert('not paper certificate');
      $('#tributeNotifyAddressState').val('');
      $('#tributeNotifyAddressCountry').val('');
  }
    $.ajax({
      type    : 'post',
      data    : $('#donation_form_id').serialize(),
      url     : '[[S551:CRDonationAPI]]',
      success   : function(response) {
        $('#btnSubmit').removeAttr('disabled').css('opacity','1');
        $('#memLoader').hide();
        window.location = '[[S6]]?pagename=membership_thanks';
      },
      error   : function(response) {
        $('#btnSubmit').removeAttr('disabled').css('opacity','1');
        $('#memLoader').hide();
        var errorMessage = '';
        if ($(response.responseText).find('fieldError').length > 0 && $(response.responseText).find('fieldError').html() != '') {
          errorMessage = $(response.responseText).find('fieldError').html()+addlErrorText;
        } else if ($(response.responseText).find('pageError').length > 0 && $(response.responseText).find('pageError').html() != '') {
          errorMessage = $(response.responseText).find('pageError').html()+addlErrorText;
        } else {
          errorMessage = 'An unexpected error occurred.'+addlErrorText;
        }
        $('#ccApiErrors').show().html(errorMessage);
      }
    });
  } else {
    window.scrollBy(0,-50);
  }
  if ($('#ecardSubject').val().length > 255) {
    $('#ecardSubject').removeClass('valid').addClass('error');
    if ($('#ecardSubject').parent().find('label.error').length <= 0) {
      $('<label class="error" for="ecardSubject" generated="true" style="display: block;">Please enter no more than 50 characters.</label>').appendTo($('#ecardMessage').parent());
    } else if ($('#ecardSubject').parent().find('label.error').css('display') == 'none') {
      $('#ecardsubject').parent().find('label.error').css('display','');
    }
  }
  if ($('#ecardMessage').val().length > 255) {
    $('#ecardMessage').removeClass('valid').addClass('error');
    if ($('#ecardMessage').parent().find('label.error').length <= 0) {
      $('<label class="error" for="ecardMessage" generated="true" style="display: block;">Please enter no more than 255 characters.</label>').appendTo($('#ecardMessage').parent());
    } else if ($('#ecardMessage').parent().find('label.error').css('display') == 'none') {
      $('#ecardMessage').parent().find('label.error').css('display','');
    }
  }
};

function changeForms(formID) {
  if (!formID || formID==='') {
    formID = formHonorEcard;
  }
  $('#formID').val(formID);
  if (formID==formMemorialEcard) {
    $('#level_id_0').val('5314');
    $('#level_id_1').val('5318');
    $('#level_id_2').val('5315');
    $('#level_id_3').val('5316');
    $('#memDonWrap #honoreeAddress').hide();
    $('#memDonWrap .eCardSection').show();
  } else if (formID==formHonorPaper) {
    $('#level_id_0').val('5303');
    $('#level_id_1').val('5302');
    $('#level_id_2').val('5304');
    $('#level_id_3').val('5301');
    $('#memDonWrap #honoreeAddress').show();
    $('#memDonWrap .eCardSection').hide();
  } else if (formID==formMemorialPaper) {
    $('#level_id_0').val('5306');
    $('#level_id_1').val('5305');
    $('#level_id_2').val('5307');
    $('#level_id_3').val('5308');
    $('#memDonWrap #honoreeAddress').show();
    $('#memDonWrap .eCardSection').hide();
  } else { //else is formHonorEcard...or anything else
    $('#level_id_0').val('5312');
    $('#level_id_1').val('5309');
    $('#level_id_2').val('5313');
    $('#level_id_3').val('5311');
    $('#memDonWrap #honoreeAddress').hide();
    $('#memDonWrap .eCardSection').show();
  }
  console.log(formID);
  console.log($('input[name=level_id]:checked').val());
}
/*run the changeForm function based on what is selected in ecard/paper & honor/memorial*/
function changeFormType(ecardPaperOption,honorMemorialOption) {
  if (ecardPaperOption== "eCard") {
    if (honorMemorialOption == "memorial"){
    //alert('You are sending an ecard/memorial gift');
    changeForms(formMemorialEcard);
    } else {
    //alert('you are sending an ecard/honor gift');
    changeForms(formHonorEcard);
    }
  } else if (ecardPaperOption== "Paper Certificate") {
    if (honorMemorialOption == "memorial"){
    //alert('You are sending an Paper Cert/memorial gift');
    changeForms(formMemorialPaper);
    } else {
    //alert('you are sending an Paper Cert/honor gift');
    changeForms(formHonorPaper);
    }
  } else {
    changeForms(formHonorEcard);
  }
  return false;
}

/*changeFormType function is ran when Level ID is changed */
function formOptionsListener() {
      var ecardPaper = "";
      var honorMemorial = "";
      $("select#ecardPaperOption").each(function() {
        if ($(this).val() != "") {
        ecardPaper = $(this).val();
        } else {
        ecardPaper = "eCard";
      }
      //alert('i am ' + ecardPaper);
      });
      $("select#tribute_type").each(function() {
        if ($(this).val() != "") {
        honorMemorial = $( this ).val();
        } else {
          honorMemorial = "tribute";
        }
      //alert('i am ' + honorMemorial);
      });
    changeFormType(ecardPaper,honorMemorial);
}
/*ERIC
function setDonAmt(id) {
  var amt = [25,50,100];
  $('#donAmt').text(amt[id]);
}*/

function deselect(e) {
    $(".pop").slideFadeToggle(function() {
        e.removeClass("selected");
    });    
}

$.fn.slideFadeToggle = function(easing, callback) {
    return this.animate({ opacity: 'toggle', height: 'toggle' }, "fast", easing, callback);
};

function closeWin() {
  deselect($("#previewButton"));
  return false;
}
    
/* onload */
(function($) {
  $(function() {
  
    /* FIX Redirect for IE8 and older 
    if(  document.addEventListener  ) {
      //alert("you got IE9 or greater");
      var dunny = 0;
      //window.location='http://www.centralparknyc.org/visit/tours/guided-tours/guided-tours-info.html';
    } else {
      window.location='https://secure2.convio.net/cpc/site/Donation2?df_id=3320&3320.donation=form1&s_src=[[S334:s_src]]&s_subsrc=[[S334:s_subsrc]]';
    }
    */
    
    // preview handling
    $("#previewButton").on('click', function() {
      if($(this).hasClass("selected")) {
        deselect($(this));
        $(this).text('Preview Ecard');            
      } else {
        $(this).addClass("selected");
        $(this).text('Close Preview');    // HERE HERE HERE - test this!
        //document.getElementById("previewPopup").src='https://secure2.convio.net/cpc/site/Ecard?taf_preview=true&taf_popup_preview_donations=true&mfc_popup=true&ecard_id=3381&stationery_layout_id=3381&cons_email=&message=&subject=&sendtoemail=&cons_first_name=John&cons_last_name=Doe&cons_info_component=true';
        $(".pop").slideFadeToggle();
      }
      return false;
    });
    
    $(".messagepop").on('click', function() {
      deselect($("#previewButton"));
      $("#previewButton").text('Preview Ecard');            
    });
    
    
  /* static and some dynamic validation rules for the donation form
  only handling front-end validation, no back-end validation such as credit card authorization */
    $('#donation_form_id').validate({
      rules: {
        'level_id'          : 'required',
        'billing.name.first'    : { 'required' : true, 'maxlength' : 50 },
        'billing.name.last'     : { 'required' : true, 'maxlength' : 50 },
        'billing.address.street1' : { 'required' : true, 'maxlength' : 50 },
        'billing.address.street2' : { 'maxlength' : 50 },
        'billing.address.city'    : { 'required' : true, 'maxlength' : 50 },
        'billing.address.state'   : 'required',
        'billing.address.zip'   : 'required',
        'donor.email'       : { 'required': true, 'email': true, 'maxlength' : 50 },
        'card_number'       : 'required',
        'card_cvv'          : 'required',
        'card_exp_date_month'   : 'required',
        'card_exp_date_year'    : 'required',
        'additional_member_first_name'  : { 'required': { depends : function(el) { return $('#addSecondPerson').is(':checked'); }},
                        'maxlength' : 50
                        },
        'additional_member_last_name'   : { 'required': { depends : function(el) { return $('#addSecondPerson').is(':checked'); }},
                        'maxlength' : 50
                        },
        'joint_donor_email'     : { 'required': { depends : function(el) { return ($('#addSecondPerson').is(':checked') && (!$('#giftMembership').is(':checked'))); }},
                        'email': true,
                        'maxlength' : 50
                        },
        'tribute.type'          : 'required',
        'tribute.honoree.name.full'         : 'required',
        'tribute.honoree.name.first': { 'required': { depends : function(el) { return $('#giftMembership').is(':checked'); }},
                        'maxlength' : 50
                        },
        'tribute.honoree.name.last' : { 'required': { depends : function(el) { return $('#giftMembership').is(':checked'); }},
                        'maxlength' : 50
                        },
        'notify_recipient_first_name'     : { 'required': { depends : function(el) { return ($('#ecardPaperOption').val() == "Paper Certificate"); }}
                        },
        'notify_recipient_last_name'      : { 'required': { depends : function(el) { return ($('#ecardPaperOption').val() == "Paper Certificate"); }}
                        },
        'tribute.notify.address.street1' : { 'required': { depends  : function(el) { return ($('#ecardPaperOption').val() == "Paper Certificate"); }}
                        },
        'tribute.notify.address.city' : { 'required': { depends : function(el) { return ($('#ecardPaperOption').val() == "Paper Certificate"); }}
                        },
        'tribute.notify.address.state' : { 'required': { depends  : function(el) { return ($('#ecardPaperOption').val() == "Paper Certificate"); }}
                        },
        'tribute.notify.address.zip' : { 'required': { depends  : function(el) { return ($('#ecardPaperOption').val() == "Paper Certificate"); }}
                        },
        'other_amount'        : { 'required' : { depends : function(el) { return $('#level_id_3').is(':checked')}},
                        min : function() { if ($('#level_id_3').is(':checked')) { return 10; }} //min amount
                      },
        'ecard.recipients'      : { 'required': { depends : function(el) { return ($('#ecardPaperOption').val() == "eCard"); }},
                        'email': true,
                        'maxlength' : 50
                        },
        'ecard.subject'     : { 'required': { depends : function(el) { return ($('#ecardPaperOption').val() == "eCard"); }},
                        'maxlength' : 50
                        },      
        'ecard.message'     : { 'required': { depends : function(el) { return ($('#ecardPaperOption').val() == "eCard"); }},
                        'maxlength' : 255
                        }                                                 
      },
      messages: {
        'level_id'          : '* required',
        'billing.name.first'    :  { 'required':  '* required',
                        'maxlength':  '* maximum length 50 characters' },
        'billing.name.last'     : { 'required':   '* required',
                        'maxlength':  '* maximum length 50 characters' },
        'billing.address.street1' : { 'required':   '* required',
                        'maxlength':  '* maximum length 50 characters' },
        'billing.address.street2' : { 'maxlength':  '* maximum length 50 characters' },
        'billing.address.city'    : { 'required':   '* required',
                        'maxlength':  '* maximum length 50 characters' },
        'billing.address.state'   : '* required',
        'billing.address.zip'   : '* required',
        'donor.email'       : { required: '* required', email: '* please enter a valid email', 'maxlength': '* maximum length 50 characters' },
        'card_number'       : '* required',
        'card_cvv'          : '* required',
        'card_exp_date_month'   : '* required',
        'card_exp_date_year'    : '* required',
        'additional_member_first_name'  : { 'required':   '* required',
                        'maxlength':  '* maximum length 50 characters' },
        'additional_member_last_name'   : { 'required':   '* required',
                        'maxlength':  '* maximum length 50 characters' },
        'joint_donor_email'     : { required: '* required', email: '* please enter a valid email', 'maxlength': '* maximum length 50 characters' },
        'tribute.type'        : '* required',
        'tribute.honoree.name.full'       : '* required',
        'tribute.honoree.name.first': { 'required':   '* required',
                        'maxlength':  '* maximum length 50 characters' },
        'tribute.honoree.name.last' : { 'required':   '* required',
                        'maxlength':  '* maximum length 50 characters' },
        'notify_recipient_first_name' : '* required',
        'notify_recipient_last_name' : '* required',
        'tribute.notify.address.street1' : '* required',
        'tribute.notify.address.city' : '* required',
        'tribute.notify.address.state' : '* required',
        'tribute.notify.address.zip' : '* required',
        'other_amount'        : '<span id="othError">Please enter an amount greater than $10.</span>', //min amount
        'ecard.recipients' : '* required',
        'ecard.subject' : '* required',
        'ecard.message' : '* required'
      }
    });

    $('#cardNumber').numericOnly();

  // Hide the ecard and paper certificate fields until options are selected
    $('#memDonWrap #honoreeAddress').hide();
    $('#memDonWrap .eCardSection').hide();

/*from donation form - handle other amount field*/
$('[id^=level_id_]').click(function(){
      var id = $(this).attr('id').substring(9,10);
      var amt = [25,50,100];
      if (id == 3) {
        $('#donAmt').text($('#other_amount').val());
        $('#other_amount').focus();
      } else {
        $('#donAmt').text(amt[id]);
      }
    });
    
    $('#other_amount').keydown(function(){
      setTimeout(function(){
        $('#donAmt').text($('#other_amount').val());
      }, 50);
    });
    
    $('#other_amount').click(function(){
      $('#donAmt').text($('#other_amount').val());
    });


/*function to get the values of ecard and honor fields*/
    $("select#ecardPaperOption, select#tribute_type").change(function() {
      var ecardPaper = "";
      var honorMemorial = "";
      $("select#ecardPaperOption").each(function() {
        if ($(this).val() != "") {
        ecardPaper = $(this).val();
        } else {
        ecardPaper = "eCard";
      }
      //alert('i am ' + ecardPaper);
      });
      $("select#tribute_type").each(function() {
        if ($(this).val() != "") {
        honorMemorial = $( this ).val();
        } else {
          honorMemorial = "tribute";
        }
      //alert('i am ' + honorMemorial);
      });
    changeFormType(ecardPaper,honorMemorial);
    });

/*Run the changeFormType function when Level ID is changed */
$('[id^=level_id_]').click(function(){
    formOptionsListener();
});
  /* fades in/out credit card logos based on credit card type
  credit card type is identified in the keyup event for the credit card field */
    function swapLogos( selector ) {
      $('#visa_logo, #mc_logo, #amx_logo, #disc_logo')
        .stop()
        .animate({ 'opacity': 0.2 }, 1000);
      if ( selector != '' ) {
        $(selector)
          .stop()
          .animate({ 'opacity': 0.9 }, 1000);
      }
    };

  /* identify credit card number as user types and set the corresponding logo */
    $('#card_number').keyup(function(e) {
      var num = $(this).val();
      swapLogos('');
      if ( num.substring(0,1) == '4' && (num.length == '13' || num.length == '16') ) {
        swapLogos('#visa_logo');
      } else if ( num.substring(0,2) >= '51' && num.substring(0,2) <= '55' && num.length == '16' ) {
        swapLogos('#mc_logo');
      } else if ( (num.substring(0,2) == '34' || num.substring(0,2) == '37') && num.length == '15' ) {
        swapLogos('#amx_logo');
      }
    });


    /* STARTUP */
        
    /* override the HTML form submission so the user remains on the page while the AJAX processing can occur */
    $('#donation_form_id').submit(function() {
      processDonationForm();
      return false;
    });
    
    Shadowbox.init({ skipSetup: true });
    
    $('#donation_form_id').attr('action', 'javascript:void(0);');

    /* Initialize rules and values on page load -- in case of error or reload*/
    $("select#ecardPaperOption").val('eCard');
    $("select#tribute_type").val('tribute');
    if ($("select#ecardPaperOption option:selected").val() == "eCard"){
      if ($("select#tribute_type option:selected").val() == "tribute"){
      changeForms(formHonorEcard);
      }
    }
});
  
})(jQuery);