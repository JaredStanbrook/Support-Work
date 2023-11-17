#! /usr/bin/env node

console.log(
    'This script populates some test appointments, clients to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );

  const Appointment = require("./models/appointment");
  const Client = require("./models/client");
  
  const clients = [];
  const appointments = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = "mongodb+srv://jaredstanbrook:UgoGcK7h36iBufm3@learning.dhop2vf.mongodb.net/?retryWrites=true&w=majority";
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createClients();
    //await createAppointments();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  
  async function clientCreate(index, first_name, family_name) {
    const clientdetail = { first_name: first_name, family_name: family_name };
    //if (d_birth != false) clientdetail.date_of_birth = d_birth;
    //if (d_death != false) clientdetail.date_of_death = d_death;
  
    const client = new Client(clientdetail);
  
    await client.save();
    clients[index] = client;
    console.log(`Added client: ${first_name} ${family_name}`);
  }
  
  async function appointmentCreate(index, title, summary, isbn, client, genre) {
    const appointmentdetail = {
      title: title,
      summary: summary,
      client: client,
      isbn: isbn,
    };
    if (genre != false) appointmentdetail.genre = genre;
  
    const appointment = new Book(appointmentdetail);
    await appointment.save();
    appointments[index] = appointment;
    console.log(`Added appointment: ${title}`);
  }
  
  async function createClients() {
    console.log("Adding clients");
    await Promise.all([
      clientCreate(0, "Patrick", "Rothfuss"),
      clientCreate(1, "Ben", "Bova"),
      clientCreate(2, "Isaac", "Asimov"),
      clientCreate(3, "Bob", "Billings"),
      clientCreate(4, "Jim", "Jones"),
    ]);
  }
  
  async function createAppointments() {
    console.log("Adding Appointments");
    await Promise.all([
      appointmentCreate(0,
        "Appointment 1",
        clients[0],
        '2002-12-09'
      ),
      appointmentCreate(1,
        "Appointment 2",
        clients[1],
        '2002-12-09'
      ),
      appointmentCreate(2,
        "Appointment 3",
        clients[2],
        '2002-12-09'
      ),
      appointmentCreate(3,
        "Appointment 4",
        clients[1],
        '2002-12-09'
      ),
    ]);
  }  