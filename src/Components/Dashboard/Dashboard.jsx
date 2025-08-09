import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers, faUserGraduate, faChalkboardTeacher, faBus,
    faCalendarAlt, faChartLine, faChartPie, faIdCard,
    faArrowUp, faArrowDown, faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'chart.js';
import styles from './Dashboard.module.css';

// Register Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
    // Refs for chart canvases
    const attendanceChartRef = useRef(null);
    const feeChartRef = useRef(null);
    const performanceChartRef = useRef(null);
    const genderChartRef = useRef(null);

    // Chart instances ref
    const chartInstances = useRef({
        attendance: null,
        fee: null,
        performance: null,
        gender: null
    });

    // Sample data
    const stats = [
        { title: "Total Students", value: 1245, icon: faUserGraduate, color: "#4e73df", trend: "+12%", trendIcon: faArrowUp },
        { title: "Total Staff", value: 48, icon: faUsers, color: "#1cc88a", trend: "+5%", trendIcon: faArrowUp },
        { title: "Faculty Members", value: 32, icon: faChalkboardTeacher, color: "#36b9cc", trend: "+3%", trendIcon: faArrowUp },
        { title: "Transport Routes", value: 8, icon: faBus, color: "#f6c23e", trend: "0%", trendIcon: null }
    ];

    const upcomingEvents = [
        { title: "Annual Sports Day", date: "15 Aug 2023", time: "9:00 AM" },
        { title: "PTM for Class X", date: "20 Aug 2023", time: "10:00 AM" },
        { title: "Science Exhibition", date: "25 Aug 2023", time: "11:00 AM" }
    ];

    const recentActivities = [
        { activity: "New admission - Riya Sharma (Class 6)", time: "2 hours ago" },
        { activity: "Fee payment received - Arjun Patel", time: "5 hours ago" },
        { activity: "Staff added - Mrs. Priya Mathur (Maths)", time: "1 day ago" }
    ];

    // Initialize charts
    const initializeCharts = () => {
        // Destroy existing charts first
        Object.values(chartInstances.current).forEach(chart => chart && chart.destroy());

        // Attendance Line Chart
        if (attendanceChartRef.current) {
            const attendanceCtx = attendanceChartRef.current.getContext('2d');
            chartInstances.current.attendance = new Chart(attendanceCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Attendance Rate',
                        data: [85, 82, 88, 87, 90, 89, 92],
                        borderColor: '#4e73df',
                        backgroundColor: 'rgba(78, 115, 223, 0.05)',
                        borderWidth: 2,
                        pointBackgroundColor: '#4e73df',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#4e73df',
                        pointHoverBorderColor: '#fff',
                        pointHitRadius: 10,
                        pointBorderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: "rgb(255,255,255)",
                            bodyColor: "#858796",
                            titleMarginBottom: 10,
                            titleColor: '#6e707e',
                            titleFontSize: 14,
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            padding: 15,
                            displayColors: false,
                            intersect: false,
                            mode: 'index',
                            caretPadding: 10,
                            callbacks: {
                                label: function(context) {
                                    return 'Attendance: ' + context.parsed.y + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 75,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            },
                            grid: {
                                color: "rgb(234, 236, 244)",
                                drawBorder: false
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            }
                        }
                    }
                }
            });
        }

        // Fee Collection Bar Chart
        if (feeChartRef.current) {
            const feeCtx = feeChartRef.current.getContext('2d');
            chartInstances.current.fee = new Chart(feeCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Fee Collected',
                        data: [450000, 420000, 480000, 470000, 500000, 490000, 520000],
                        backgroundColor: '#1cc88a',
                        hoverBackgroundColor: '#17a673',
                        borderColor: '#1cc88a',
                        borderWidth: 1
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: "rgb(255,255,255)",
                            bodyColor: "#858796",
                            titleMarginBottom: 10,
                            titleColor: '#6e707e',
                            titleFontSize: 14,
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            padding: 15,
                            displayColors: false,
                            intersect: false,
                            mode: 'index',
                            caretPadding: 10,
                            callbacks: {
                                label: function(context) {
                                    return '₹' + context.parsed.y.toLocaleString('en-IN');
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value.toLocaleString('en-IN');
                                }
                            },
                            grid: {
                                color: "rgb(234, 236, 244)",
                                drawBorder: false
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            }
                        }
                    }
                }
            });
        }

        // Performance Radar Chart
        if (performanceChartRef.current) {
            const performanceCtx = performanceChartRef.current.getContext('2d');
            chartInstances.current.performance = new Chart(performanceCtx, {
                type: 'radar',
                data: {
                    labels: ['Math', 'Science', 'English', 'History', 'Geography', 'Computer'],
                    datasets: [{
                        label: 'Class Average',
                        data: [75, 82, 78, 85, 80, 88],
                        backgroundColor: 'rgba(78, 115, 223, 0.2)',
                        borderColor: 'rgba(78, 115, 223, 1)',
                        pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        r: {
                            angleLines: { display: true },
                            suggestedMin: 50,
                            suggestedMax: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Gender Distribution Doughnut Chart
        if (genderChartRef.current) {
            const genderCtx = genderChartRef.current.getContext('2d');
            chartInstances.current.gender = new Chart(genderCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Male', 'Female', 'Other'],
                    datasets: [{
                        data: [680, 550, 15],
                        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                        hoverBorderColor: "rgba(234, 236, 244, 1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: "rgb(255,255,255)",
                            bodyColor: "#858796",
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            padding: 15,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    },
                    cutout: '70%'
                }
            });
        }
    };

    // Initialize charts when component mounts
    useEffect(() => {
        initializeCharts();
        // Cleanup function to destroy charts when component unmounts
        return () => {
            Object.values(chartInstances.current).forEach(chart => chart && chart.destroy());
        };
    }, []);

    return (
        <div className={styles['dashboard-container']}>
            <div className={styles['dashboard-header']}>
                <h2>Dashboard</h2>
                <div className={styles['header-actions']}>
                    <div className={styles['date-filter']}>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span>Select Date</span>
                    </div>
                    <button className={styles['export-btn']}>
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                </div>
            </div>

            <div className={styles['stats-grid']}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles['stat-card']}>
                        <div className={styles['stat-content']}>
                            <div className={styles['stat-title']}>{stat.title}</div>
                            <div className={styles['stat-value']}>{stat.value}</div>
                            <div className={styles['stat-trend']} style={{ color: stat.color }}>
                                {stat.trendIcon && <FontAwesomeIcon icon={stat.trendIcon} />}
                                <span>{stat.trend}</span>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={stat.icon} className={styles['stat-icon']} style={{ color: stat.color }} />
                    </div>
                ))}
            </div>

            <div className={styles['charts-row']}>
                <div className={styles['chart-container']}>
                    <div className={styles['chart-header']}>
                        <h3>Attendance Overview</h3>
                        <select>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    <div className={styles['chart-wrapper']}>
                        <canvas ref={attendanceChartRef}></canvas>
                    </div>
                </div>
                <div className={styles['chart-container']}>
                    <div className={styles['chart-header']}>
                        <h3>Fee Collection</h3>
                        <select>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    <div className={styles['chart-wrapper']}>
                        <canvas ref={feeChartRef}></canvas>
                    </div>
                </div>
            </div>

            <div className={styles['charts-row']}>
                <div className={styles['chart-container']}>
                    <div className={styles['chart-header']}>
                        <h3>Performance Overview</h3>
                    </div>
                    <div className={styles['chart-wrapper']}>
                        <canvas ref={performanceChartRef}></canvas>
                    </div>
                </div>
                <div className={styles['chart-container']}>
                    <div className={styles['chart-header']}>
                        <h3>Gender Distribution</h3>
                    </div>
                    <div className={styles['chart-wrapper']}>
                        <canvas ref={genderChartRef}></canvas>
                    </div>
                </div>
            </div>

            <div className={styles['bottom-row']}>
                <div className={styles['events-container']}>
                    <div className={styles['section-header']}>
                        <h3>Upcoming Events</h3>
                        <button className={styles['view-all']}>View All</button>
                    </div>
                    <div className={styles['events-list']}>
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className={styles['event-item']}>
                                <div className={styles['event-date']}>
                                    <div className={styles['event-day']}>{new Date(event.date).getDate()}</div>
                                    <div className={styles['event-month']}>{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                                </div>
                                <div className={styles['event-details']}>
                                    <div className={styles['event-title']}>{event.title}</div>
                                    <div className={styles['event-time']}>
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        <span>{event.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles['activities-container']}>
                    <div className={styles['section-header']}>
                        <h3>Recent Activities</h3>
                        <button className={styles['view-all']}>View All</button>
                    </div>
                    <div className={styles['activities-list']}>
                        {recentActivities.map((activity, index) => (
                            <div key={index} className={styles['activity-item']}>
                                <div className={styles['activity-icon']}>
                                    <FontAwesomeIcon icon={faIdCard} />
                                </div>
                                <div className={styles['activity-details']}>
                                    <div className={styles['activity-text']}>{activity.activity}</div>
                                    <div className={styles['activity-time']}>{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
