import React, { useState, useEffect } from "react";
import { auth, db } from "../Auth/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

function Directory() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === "testing@testing.com") {
        setAllowed(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "employees"), orderBy("name", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const employees = [];
        querySnapshot.forEach((doc) => {
          employees.push({ id: doc.id, ...doc.data() });
        });
        setEmployees(employees);
      },
      (error) => {
        console.error("Error fetching employees: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleNewEmployeeClick = () => {
    if (allowed) {
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { name, surname, email, department } = e.target.elements;

    try {
      await addDoc(collection(db, "employees"), {
        name: name.value,
        surname: surname.value,
        email: email.value,
        department: department.value,
      });
    } catch (error) {
      console.error("Error adding employee: ", error);
    }
//
    setShowForm(false);
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const filteredEmployees = employees.filter(function (employee) {
    const Name = employee.name + " " + employee.surname;
    return Name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container">
      <h1>Employee Directory</h1>
      <div className="search-container">
        <label htmlFor="search">Search by name:</label>
        <input type="text" id="search" onChange={handleSearchInput} />
      </div>
      {filteredEmployees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td><a href={"mailto:" + employee.email}>{employee.email}</a></td>
                <td>{employee.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees record.</p>
      )}
      {allowed && (
        <div>
          <button className="small-button" onClick={handleNewEmployeeClick}>
            Add Employee
          </button>
          {showForm && (
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required />
              </div>
              <div>
                <label htmlFor="surname">Surname:</label>
                <input type="text" id="surname" required />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required />
              </div>
              <div>
                <label htmlFor="department">Department:</label>
                <input type="text" id="department" required />
              </div>
              <button className="small-button" type="submit">
                Save
              </button>
              <button className="small-button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          )}
        </div>
      )}
      <Link to="/">
        <button className="back-button">&#60;</button>
      </Link>
    </div>
  );
}

export default Directory;
