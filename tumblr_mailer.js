var fs = require('fs');
var ejs = require('ejs');
 
var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync('email_template.html', 'utf8');
var tumblr = require('tumblr.js');
 
var client = tumblr.createClient({
  consumer_key: 'AFqthgRYKrRwiAx1EbvdNNNDmQpao7T7EFwRSB2E9BMCKmW4cR',
  consumer_secret: '6Fs4wSj6OgKLexCz2lUPYuqW5I8xP62O3thrJVAoXjhBr1eV6O',
  token: 'u0OYbHwuXEUHIrgr1NMMbu2300N8fYLI96B2zMuNRQX4I6yAtu',
  token_secret: 'jyCRBV4jdlxxJA3mQOVlXi0CsI9AXkpbMeORjWyBJxLMapuvMz'
});
 
function csvParse(csvFile){
  var arrayOfObjects = [];
  var arr = csvFile.split("\n");
  var newObj;
 
  keys = arr.shift().split(",");
 
  arr.forEach(function(contact){
    contact = contact.split(",");
    newObj = {};
    
    for(var i =0; i < contact.length; i++){
      newObj[keys[i]] = contact[i];
    }
 
    arrayOfObjects.push(newObj);
 
  })
 
  return arrayOfObjects;
}
 
  client.posts('alicht.tumblr.com', function(err, blog){
    var latestPosts = [];
    blog.posts.forEach(function(post){
      // CHECK IF POST IS 7 Days OLD or LESS.  If it is, put the post object in the array.
    })
    
    csvData = csvParse(csvFile);
   
    csvData.forEach(function(row){
      firstName = row['firstName'];
      numMonthsSinceContact = row['numMonthsSinceContact'];
      copyTemplate = emailTemplate;
      
      var customizedTemplate = ejs.render(copyTemplate, {firstName: firstName,
                     numMonthsSinceContact: numMonthsSinceContact,
                     latestPosts: latestPosts                 
       });
 
      sendEmail(firstName, row["emailAddress"], "Scott D", "scott@fullstackacademy.com", "testing", customizedTemplate);      
    
    });
 
    
                                  
  
 
});
 
 
 
 
function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
  var message = {
      "html": message_html,
      "subject": subject,
      "from_email": from_email,
      "from_name": from_name,
      "to": [{
              "email": to_email,
              "name": to_name
          }],
      "important": false,
      "track_opens": true,    
      "auto_html": false,
      "preserve_recipients": true,
      "merge": false,
      "tags": [
          "Fullstack_Tumblrmailer_Workshop"
      ]    
  };
  var async = false;
  var ip_pool = "Main Pool";
  mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
              
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
}

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('mU4iIn2w9IA7TK6hfQvJUA');