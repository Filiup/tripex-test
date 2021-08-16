import $, { data } from "jquery";
import axios from "axios";
import validator from 'validator';


async function post(data) {
  const BaseURL = "http://localhost:2443";
  try {
    const res = await axios.post(BaseURL, { data: data });
    console.log(res.data)

  } catch(err) {
      console.error(err);
    return;
  }


}

function postData(array) {
  let data = {};

  array.forEach(item => {
    data = {... data, [item.name]: item.value}
  });

  post(data);

}

function ValidateMail(element) {
  const value = element.val();

  if (value.length === 0) return;  // If element has no value then ignore it
  if (!validator.isEmail(value)) element.addClass("is-invalid");


}

function ValidateNumber(element) {
  const value = element.val();

  if (value.length === 0) return;  // If element has no value then ignore it
  if (!validator.isNumeric(value)) element.addClass("is-invalid");

}


function ValidateName(element) {
  const value = element.val();

  if (value.length === 0) return;  // If element has no value then ignore it
  if (!/^[a-z ,.'-]+$/i.test(value)) element.addClass("is-invalid");

} 


$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    $("input").removeClass("is-invalid");

    // Required inputs
    ValidateMail($('input[name="customer_mail"]'));
    ValidateNumber($('input[name="order_amount"]'));
    ValidateNumber($('input[name="order_number"]'));
    ValidateName($('input[name="name_surname"]'));


    // Do not post data to server if something is wrongly typed (has a "is-invalid" class)
    if (!$("input").hasClass("is-invalid")) {
      postData($(this).serializeArray());
    }
    
    
  });

})
