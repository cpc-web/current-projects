$('#donation_form_id').validate({
	rules: {
		'level_id'          : 'required',
		'tribute.honoree.name.full'	: 'required',
		'tribute.type'          : 'required',


		'donor.email'       : { 'required': true, 'email': true, 'maxlength' : 50 },
		'card_number'       : 'required',
		'card_cvv'          : 'required',
		'card_exp_date_month'   : 'required',
		'card_exp_date_year'    : 'required',
		'type.of.notification.dropdown' 		: 'required',
		'ecard.send'    : { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "eCard"); }}
			},
		'ecard_send_date_MONTH' : { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "eCard"); }}
			},
		'ecard_send_date_DAY' : { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "eCard"); }}
			},
		'ecard_send_date_YEAR' : { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "eCard"); }} 
			},

		'ecard.recipients': { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "eCard"); }} 
			},
		'ecard.id': { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "eCard"); }} 
			},
		'ecard.subject': { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "eCard"); }} 
			},
		'ecard.message': { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "eCard"); }} 
			},









		'billing.name.first'    : { 'required' : true, 'maxlength' : 50 },
		'billing.name.last'     : { 'required' : true, 'maxlength' : 50 },
		'billing.address.street1' : { 'required' : true, 'maxlength' : 50 },
		'billing.address.street2' : { 'maxlength' : 50 },
		'billing.address.city'    : { 'required' : true, 'maxlength' : 50 },
		'billing.address.state'   : 'required',
		'billing.address.zip'   : 'required',

  },


   : { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "eCard"); }}
   : { 'required': { depends : function(el) { return ($('#type_of_notification_dropdown').val() == "Mailed Certificate"); }}




