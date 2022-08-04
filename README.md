Models

User {
  _id: this will be attached to each message saved within the database
  fullname: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  membership: {type: String}
}

Message {
  user: express generated id that identifies who is the owner of this message
    :whenever the messages are loaded
      
      :if the user is not a member, show only the content and anynomous on the rest of the fields
      :if the user is a member, show the title and timestamp
      :if the user is a member and the owner of the message rendered, show the delete button on that message
      :if the user is an admin, show the delete button on all messages

  title: {type: String, required: true}
  timestamp: {type: Date, required: true}
  text: {type: String, required: true}
}

- TODO
  <!-- - Make a user become a member if they enter the right string on the become-member form POST method
    :find the logged in user in the database, and add a property status: 'member' to it
    :get user with the req method
    :add conditionals on the dashboard template so it shows a certain string if the user has the property status: 'member' on it
   -->
  - Render all messages from database on the dashboard template
  - Give ability to users and admins to create a message through the create-message template form
    :when it is submitted, upload it to the database
    :everytime that a anyone loads the dashboard, show the messages
    :if they are members
      :give the ability to see usernames and timestamps, and delete their own messages
    :if they are admins
      :give the ability to delete all messages

- QUESTIONS
  Should I store a messages array within the User model? Would it be a string or an id?