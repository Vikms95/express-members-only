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

- QUESTIONS
  Should I store a messages array within the User model? Would it be a string or an id?