// src/App.js

"use client"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTachometerAlt,
  faUserPlus,
  faUsers,
  faRupeeSign,
  faCog,
  faSignOutAlt,
  faBook,
  faCalendarAlt,
  faUserGraduate,
  faChartBar,
  faBell,
  faEnvelope,
  faChalkboardTeacher,
  faFileInvoiceDollar,
  faIdCard,
  faBus,
  faGraduationCap,
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faUserCircle,
  faCalendarCheck,
  faCertificate,
  faClipboardList,
  faMoneyBillWave,
  faPoll,
  faUsersCog
} from "@fortawesome/free-solid-svg-icons"
import style from '../src/App.css';
import Dashboard from '../src/Components/Dashboard/Dashboard';
import AccountSection from '../src/Components/Account/AccountSection';
import NewAddmission from '../src/Components/Addmission/NewAddmission';
import Applications from '../src/Components/Addmission/Applications';
import Enquiry from '../src/Components/Addmission/Enquiries';
import AdmissionReport from '../src/Components/Addmission/AddmissionReport';
import ClassList from "./Components/Classes/Classes";
import SectionManager from "./Components/Classes/Section";
import TeacherAssigner from "./Components/Classes/ClassTeacher";
import AttendanceDashboard from './Components/Attendence/AttendenceDashboard';
import SchoolProfile from './Components/Setting/SchoolProfile';
import AcademicYear from './Components/Setting/AcademicYear';
import UserManagement from './Components/Setting/UserManagement';
import SystemSettings from './Components/Setting/SystemSettings';
import Routes from './Components/Transport/Routes';
import Vehicles from './Components/Transport/Vehicles';
import Drivers from './Components/Transport/Drivers';
import TransportFees from './Components/Transport/TransportFee';
import Certification from './Components/Certification/CertificationSection';
import ExamSchedule from "./Exam/ExamSchedule";
import Grades from "./Exam/Grades";
import MarksEntry from "./Exam/MarksEntry";
import Result from "./Exam/Result";
import Toppers from "./Exam/Toppers";
import ClassTimetable from "./Components/TimeTable/ClassTimetable";
import TeacherTimetable from "./Components/TimeTable/TeacherTimetable";
import GenerateTimetable from "./Components/TimeTable/GenerateTimetable";
import FeeCollection from "./Components/Fee/FeeCollection";
import FeeStructure from "./Components/Fee/FeeStructure";
import PendingFees from "./Components/Fee/PendingFee";
import FeeReport from "./Components/Fee/FeeReport";
import FeeReports from "./Components/Fee/FeeReport";
import AllFaculty from "./Components/Faculty/AllFaculty";
import AssignSubjects from "./Components/Faculty/AssignSubjects";
import Workload from "./Components/Faculty/Workload";
import FacultyAttendance from "./Components/Faculty/FacultyAttendance";
import AllStaff from "./Components/Staff/AllStaff";
import NonTeachingStaff from "./Components/Staff/NonTeachingStaff";
import StaffAttendance from "./Components/Staff/StaffAttendence";
import StaffReports from "./Components/Staff/StaffReports";
import SalaryStructure from "./Components/Payroll/SalaryStructure";
import PayrollReports from "./Components/Payroll/PayrollReports";
import Payments from "./Components/Payroll/Payments";
import SalarySlips from "./Components/Payroll/SalaryStructure";
import AddExpense from "./Components/Expenses/AddExpense";
import ExpenseCategories from "./Components/Expenses/ExpenseCategories";
import ExpenseReports from "./Components/Expenses/ExpenseReports";
import PublishResults from "./Components/Result/PublishResults";
import ViewResults from "./Components/Result/ViewResults";
import ReportCards from "./Components/Result/ReportCards";
import MeritList from "./Components/Result/MeritList";
import PromoteStudents from "./Components/Promotion/PromoteStudents";
import PromotionCriteria from "./Components/Promotion/PromotionCriteria";
import PromotionReports from "./Components/Promotion/PromotionReports";
import AllSubjects from "./Components/Subjects/AllSubjects";
import AssignTeachers from "./Components/Subjects/AssignTeachers";
import SubjectGroups from "./Components/Subjects/SubjectGroups";
//import Timetable from "./Components/TimeTable/Timetable";

// Define themes object and theme state here, outside of any component
const themes = {
  light: {
    background: '#f0f2f5',
    cardBackground: '#ffffff',
    primary: '#4a90e2',
    secondary: '#1a237e',
    text: '#333333',
    subText: '#666666',
    border: '#e0e0e0',
    hover: '#fafafa',
  },
  dark: {
    background: '#121212',
    cardBackground: '#1e1e1e',
    primary: '#4a90e2',
    secondary: '#ffffff',
    text: '#ffffff',
    subText: '#b0b0b0',
    border: '#333333',
    hover: '#282828',
  },
};

export default function SchoolERP() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Application state
  const [currentSection, setCurrentSection] = useState("Dashboard")
  const [notifications, setNotifications] = useState(3)
  const [messages, setMessages] = useState(5)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light'); // Theme state for App.js
  const theme = themes[currentTheme]; // Theme variable for App.js

  // Sample Data (your existing state)
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", class: "10th", attendance: "95%", fees: "Paid" },
    { id: 2, name: "Priya Patel", class: "9th", attendance: "89%", fees: "Pending" },
    { id: 3, name: "Amit Singh", class: "11th", attendance: "92%", fees: "Paid" }
  ])

  const [staff, setStaff] = useState([
    { id: 1, name: "Dr. Sunita Verma", position: "Principal", salary: "₹1,20,000" },
    { id: 2, name: "Prof. Rajesh Kumar", position: "Math Teacher", salary: "₹75,000" },
    { id: 3, name: "Ms. Neha Gupta", position: "English Teacher", salary: "₹68,000" }
  ])

  const [fees, setFees] = useState([
    { id: 1, student: "Rahul Sharma", amount: "₹15,000", status: "Paid", dueDate: "15/08/2023" },
    { id: 2, student: "Priya Patel", amount: "₹15,000", status: "Due", dueDate: "15/08/2023" },
    { id: 3, student: "Amit Singh", amount: "₹18,000", status: "Paid", dueDate: "20/08/2023" }
  ])

  // Centralized State for Classes and Teachers (your existing state)
  const [classes, setClasses] = useState([
    { id: 1, name: 'Nursery', teacherId: 101, room: 'G-101', students: 90, sections: ['A', 'B', 'C'] },
    { id: 2, name: 'Kindergarten', teacherId: null, room: 'G-102', students: 60, sections: [] },
    { id: 3, name: 'Class I', teacherId: 102, room: '1-201', students: 120, sections: ['A', 'B', 'C', 'D'] },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 101, name: 'Ms. Priya Sharma', assignedClassId: 1 },
    { id: 102, name: 'Ms. Neha Gupta', assignedClassId: 3 },
    { id: 103, name: 'Mr. Verma', assignedClassId: null },
    { id: 104, name: 'Ms. Pooja', assignedClassId: null },
  ]);

  // Menu items configuration
  const menuItems = [
    {
      title: "Dashboard",
      icon: faTachometerAlt,
      path: "Dashboard"
    },
    {
      title: "Account",
      icon: faUserCircle,
      path: "Account",
    },
    {
      title: "Admission",
      icon: faUserPlus,
      path: "Admission",
      submenu: ["New Admission", "Applications", "Enquiry", "Admission Report"]
    },
    {
      title: "Class",
      icon: faUsers,
      path: "Class",
      submenu: ["All Classes", "Sections", "Class Teachers"]
    },
    {
      title: "Attendance",
      icon: faCalendarCheck,
      path: "Attendance" // This will now open the AttendanceDashboard
    },
    {
      title: "Certification",
      icon: faCertificate,
      path: "Certification",

    },
    {
      title: "Exam",
      icon: faClipboardList,
      path: "Exam",
      submenu: ["Exam Schedule", "Grades", "Marks Entry", "Result", "Toppers"]
    },
    {
      title: "Fee",
      icon: faRupeeSign,
      path: "Fee",
      submenu: ["Fee Collection", "Fee Structure", "Pending Fees", "Fee Reports"]
    },
    {
      title: "Faculty",
      icon: faChalkboardTeacher,
      path: "Faculty",
      submenu: ["All Faculty", "Assign Subjects", "Workload", "Faculty Attendance"]
    },
    {
      title: "Staff",
      icon: faUsersCog,
      path: "Staff",
      submenu: ["All Staff", "Non-Teaching Staff", "Staff Attendance", "Staff Reports"]
    },
    {
      title: "Payroll",
      icon: faMoneyBillWave,
      path: "Payroll",
      submenu: ["Salary Structure", "Salary Slips", "Payments", "Payroll Reports"]
    },
    {
      title: "Expenses",
      icon: faFileInvoiceDollar,
      path: "Expenses",
      submenu: ["Add Expense", "Expense Categories", "Expense Reports"]
    },
    {
      title: "Result",
      icon: faPoll,
      path: "Result",
      submenu: ["Publish Results", "View Results", "Report Cards", "Merit List"]
    },
    {
      title: "Promotion",
      icon: faGraduationCap,
      path: "Promotion",
      submenu: ["Promote Students", "Promotion Criteria", "Promotion Reports"]
    },
    {
      title: "Transport",
      icon: faBus,
      path: "Transport",
      submenu: ["Routes", "Vehicles", "Drivers", "Transport Fees"]
    },
    {
      title: "Timetable",
      icon: faCalendarAlt,
      path: "Timetable",
      submenu: ["Class Timetable", "Teacher Timetable", "Generate Timetable"]
    },
    {
      title: "Subject",
      icon: faBook,
      path: "Subject",
      submenu: ["All Subjects", "Assign Teachers", "Subject Groups"]
    },
    {
      title: "Settings",
      icon: faCog,
      path: "Settings",
      submenu: ["School Profile", "Academic Year", "User Management", "System Settings"]
    }
  ]

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault()
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true)
      setLoginError("")
    } else {
      setLoginError("Invalid username or password")
    }
  }

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
    setCurrentSection("Dashboard")
  }

  // Toggle function
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    // If the item has a submenu, toggle the active menu to open/close it.
    if (item.submenu) {
      setActiveMenu(activeMenu === item.title ? null : item.title)
    } else {
      // If the item has no submenu, it's a content-level item.
      // Set the current section, and also clear the activeMenu.
      setCurrentSection(item.title)
      setActiveMenu(null);
    }
  }

  // Handle submenu item click
  const handleSubmenuItemClick = (subItem) => {
    setCurrentSection(subItem)
  }

  // State Update Functions for Classes and Teachers (your existing state)
  const handleAssignTeacher = (classId, teacherId) => {
    setClasses(prevClasses =>
        prevClasses.map(cls =>
            cls.id === classId ? { ...cls, teacherId: teacherId ? parseInt(teacherId) : null } : cls
        )
    );

    setTeachers(prevTeachers =>
        prevTeachers.map(t => {
          // First, unassign the teacher from any other class if needed
          if (t.assignedClassId === classId) {
            return { ...t, assignedClassId: null };
          }
          // Then, assign the new teacher to the class
          if (t.id === parseInt(teacherId)) {
            return { ...t, assignedClassId: classId };
          }
          return t;
        })
    );
  };

  const handleAddSection = (classId, newSectionName) => {
    setClasses(prevClasses =>
        prevClasses.map(cls =>
            cls.id === classId ? { ...cls, sections: [...cls.sections, newSectionName] } : cls
        )
    );
  };

  const handleAddNewClass = (newClassData) => {
    const newClassObj = {
      id: classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1,
      ...newClassData,
      teacherId: null,
      students: 0,
      sections: [],
    };
    setClasses(prevClasses => [...prevClasses, newClassObj]);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        }}>
          <div style={{
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            width: "100%",
            maxWidth: "400px",
            padding: "2rem",
            margin: "1rem"
          }}>
            <div style={{
              textAlign: "center",
              marginBottom: "2rem"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                color: "white",
                fontSize: "2rem"
              }}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <h2 style={{ marginBottom: "0.5rem" }}>School ERP</h2>
              <p style={{ color: "#666" }}>Welcome back! Please login to continue</p>
            </div>

            {loginError && (
                <div style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                  textAlign: "center"
                }}>
                  {loginError}
                </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500"
                }}>
                  Username
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "1rem"
                    }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500"
                }}>
                  Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "1rem"
                    }}
                />
              </div>

              <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
              >
                Login <FontAwesomeIcon icon={faSignOutAlt} style={{ transform: "rotate(180deg)" }} />
              </button>
            </form>

            <div style={{
              marginTop: "2rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#666",
              padding: "1rem",
              background: "#f3f4f6",
              borderRadius: "4px"
            }}>
              <strong>Demo Credentials:</strong>
              <div>Username: admin</div>
              <div>Password: admin123</div>
            </div>
          </div>
        </div>
    )
  }

  // Main Application
  return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>
        {/* Header */}
        <header style={{
          background: "#2c3e50",
          color: "white",
          padding: "0 1rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
                onClick={toggleSidebar}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontSize: "1.25rem",
                  cursor: "pointer"
                }}
            >
              <FontAwesomeIcon icon={sidebarCollapsed ? faAngleRight : faAngleLeft} />
            </button>
            <h2 style={{ margin: 0 }}>School ERP</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <button style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "1.25rem",
                cursor: "pointer",
                position: "relative"
              }}>
                <FontAwesomeIcon icon={faBell} />
                {notifications > 0 && (
                    <span style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem"
                    }}>
                  {notifications}
                </span>
                )}
              </button>
            </div>

            <div style={{ position: "relative" }}>
              <button style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "1.25rem",
                cursor: "pointer",
                position: "relative"
              }}>
                <FontAwesomeIcon icon={faEnvelope} />
                {messages > 0 && (
                    <span style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem"
                    }}>
                  {messages}
                </span>
                )}
              </button>
            </div>

            <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span style={{ fontSize: "0.875rem" }}>Logout</span>
            </button>
          </div>
        </header>

        <div style={{ display: "flex", flex: 1 }}>
          {/* Sidebar */}
          <aside
              className={mobileMenuOpen ? "mobile-sidebar-open" : ""}
              style={{
                width: sidebarCollapsed ? "80px" : "250px",
                background: "#1a252f",
                color: "white",
                transition: "width 0.3s ease",
                overflow: "hidden"
              }}
          >

            <nav style={{ padding: "1rem" }}>
              {menuItems.map((item, index) => (
                  <div key={index} style={{ marginBottom: "0.5rem" }}>
                    <button
                        onClick={() => {
                          if (item.submenu) {
                            handleMenuItemClick(item);
                          } else {
                            handleSubmenuItemClick(item.title);
                            setActiveMenu(null);
                          }
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          background: currentSection === item.title ? "#4361ee" : (activeMenu === item.title ? "#2d3748" : "transparent"),
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "0.75rem",
                          transition: "background 0.2s ease"
                        }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <FontAwesomeIcon icon={item.icon} style={{ minWidth: "20px" }} />
                        {!sidebarCollapsed && <span>{item.title}</span>}
                      </div>
                      {!sidebarCollapsed && item.submenu && (
                          <FontAwesomeIcon
                              icon={activeMenu === item.title ? faAngleDown : faAngleRight}
                              style={{ fontSize: "0.8rem" }}
                          />
                      )}
                    </button>

                    {/* Submenu items */}
                    {!sidebarCollapsed && item.submenu && activeMenu === item.title && (
                        <div style={{
                          marginLeft: "1.5rem",
                          marginTop: "0.5rem",
                          borderLeft: "1px solid #2d3748",
                          paddingLeft: "0.5rem"
                        }}>
                          {item.submenu.map((subItem, subIndex) => (
                              <button
                                  key={subIndex}
                                  onClick={() => handleSubmenuItemClick(subItem)}
                                  style={{
                                    width: "100%",
                                    textAlign: "left",
                                    background: currentSection === subItem ? "#4361ee" : "transparent",
                                    color: "white",
                                    border: "none",
                                    padding: "0.5rem 0.75rem",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    display: "block",
                                    fontSize: "0.875rem",
                                    marginBottom: "0.25rem",
                                    transition: "background 0.2s ease"
                                  }}
                              >
                                {subItem}
                              </button>
                          ))}
                        </div>
                    )}
                  </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{
            flex: 1,
            padding: "1.5rem",
            background: "#f3f4f6",
            overflow: "auto"
          }}>
            <div style={{
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              padding: "1.5rem",
              minHeight: "calc(100vh - 60px - 3rem)"
            }}>
              <h2 style={{ marginBottom: "1.5rem" }}>{currentSection}</h2>
              {/* Theme buttons for a theme-aware app */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2rem',
              }}>
                <button
                    onClick={() => setCurrentTheme('light')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      border: 'none',
                      backgroundColor: theme.cardBackground,
                      color: theme.text,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      fontWeight: '500',
                    }}
                >
                  Light Theme
                </button>
                <button
                    onClick={() => setCurrentTheme('dark')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      border: 'none',
                      backgroundColor: theme.cardBackground,
                      color: theme.text,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      fontWeight: '500',
                    }}
                >
                  Dark Theme
                </button>
              </div>

              {/* Dashboard Section */}
              {currentSection === "Dashboard" && <Dashboard />}

              {/* Account Sections */}
              {currentSection === "Account" && <AccountSection activeTab="Account" />}

              {/* Admission Sections */}
              {currentSection === "New Admission" && <NewAddmission />}
              {currentSection === "Applications" && <Applications />}
              {currentSection === "Enquiry" && <Enquiry />}
              {currentSection === "Admission Report" && <AdmissionReport />}

              {/* Classes Sections */}
              {currentSection === "All Classes" && (
                  <ClassList
                      classes={classes}
                      teachers={teachers}
                      onAssignTeacher={handleAssignTeacher}
                      onAddSection={handleAddSection}
                      onAddNewClass={handleAddNewClass}
                  />
              )}
              {currentSection === "Sections" && (
                  <SectionManager
                      classes={classes}
                      onAddSection={handleAddSection}
                  />
              )}
              {currentSection === "Class Teachers" && (
                  <TeacherAssigner
                      classes={classes}
                      teachers={teachers}
                      onAssignTeacher={handleAssignTeacher}
                  />
              )}

              {/* ATTENDANCE SECTION - NEWLY ADDED */}
              {currentSection === "Attendance" && <AttendanceDashboard />}

              {/* Certification Sections */}
              {currentSection === "Certification" && <Certification />}

              {/* Exam Sections */}
              {currentSection === "Exam Schedule" && <ExamSchedule />}
              {currentSection ==="Grades" && <Grades />}
              {currentSection === "Marks Entry" && <MarksEntry />}
              {currentSection === "Result" && <Result />}
              {currentSection === "Toppers" && <Toppers />}

              {/* Fee Sections */}
              {currentSection === "Fee Collection" && <FeeCollection />}
              {currentSection === "Fee Structure" && <FeeStructure />}
              {currentSection === "Pending Fees" && <PendingFees />}
              {currentSection === "Fee Reports" && <FeeReports />}

              {/* Faculty Sections */}
              {currentSection === "All Faculty" && <AllFaculty />}
              {currentSection === "Assign Subjects" && <AssignSubjects />}
              {currentSection === "Workload" && <Workload />}
              {currentSection === "Faculty Attendance" && <FacultyAttendance />}

              {/* Staff Sections */}
              {currentSection === "All Staff" && <AllStaff />}
              {currentSection === "Non-Teaching Staff" && <NonTeachingStaff />}
              {currentSection === "Staff Attendance" && <StaffAttendance />}
              {currentSection === "Staff Reports" && <StaffReports />}

              {/* Payroll Sections */}
              {currentSection === "Salary Structure" && <SalaryStructure />}
              {currentSection === "Salary Slips" && <SalarySlips />}
              {currentSection === "Payroll Reports" && <PayrollReports />}
              {currentSection === "Payments" && <Payments />}

              {/* Expenses Sections */}
              {currentSection === "Add Expense" && <AddExpense />}
              {currentSection === "Expense Categories" && <ExpenseCategories />}
              {currentSection === "Expense Reports" && <ExpenseReports />}
              {/* Result Sections */}
              {currentSection === "Publish Results" && <PublishResults />}
              {currentSection === "View Results" && <ViewResults />}
              {currentSection === "Report Cards" && <ReportCards />}
              {currentSection === "Merit List"&& <MeritList />}

              {/* Promotion Sections */}
              {currentSection === "Promote Students" && <PromoteStudents />}
              {currentSection === "Promotion Criteria" && <PromotionCriteria />}
              {currentSection === "Promotion Reports" && <PromotionReports />}

              {/* Transport Sections */}
              {currentSection === "Routes" && <Routes />}
              {currentSection === "Vehicles" && <Vehicles />}
              {currentSection === "Drivers" && <Drivers />}
              {currentSection === "Transport Fees" && <TransportFees />}

              {/* Timetable Sections */}
              {currentSection === "Class Timetable" && <ClassTimetable theme={theme} />}
              {currentSection === "Teacher Timetable" && <TeacherTimetable theme={theme} />}
              {currentSection === "Generate Timetable" && <GenerateTimetable theme={theme} />}


              {/* Subject Sections */}
              {currentSection === "All Subjects" && <AllSubjects />}
              {currentSection === "Assign Teachers" && <AssignTeachers />}

              {currentSection === "Subject Groups"&& <SubjectGroups />}

              {/* Settings Sections */}
              {currentSection === "School Profile" && <SchoolProfile />}
              {currentSection === "Academic Year" && <AcademicYear />}
              {currentSection === "User Management" && <UserManagement />}
              {currentSection === "System Settings" && <SystemSettings />}

            </div>
          </main>
        </div>
      </div>
  )
}