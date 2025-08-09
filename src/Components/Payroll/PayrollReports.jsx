import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaFilter, FaSearch, FaMoneyBillWave, FaCoins, FaHandHoldingUsd, FaFileInvoiceDollar, FaChartBar } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy data for payroll report
const payrollData = [
    {
        id: 1, employeeName: 'Ramesh Kumar', month: 'July', year: 2024,
        grossPay: 68000, deductions: 5200, netPay: 62800, tax: 200, epf: 5000
    },
    {
        id: 2, employeeName: 'Sunita Rai', month: 'July', year: 2024,
        grossPay: 40000, deductions: 3000, netPay: 37000, tax: 0, epf: 3000
    },
    {
        id: 3, employeeName: 'Alok Singh', month: 'June', year: 2024,
        grossPay: 47000, deductions: 4000, netPay: 43000, tax: 0, epf: 4000
    },
    {
        id: 4, employeeName: 'Priya Mehta', month: 'July', year: 2024,
        grossPay: 56000, deductions: 4000, netPay: 52000, tax: 0, epf: 4000
    },
    {
        id: 5, employeeName: 'Vikram Patel', month: 'June', year: 2024,
        grossPay: 34000, deductions: 2000, netPay: 32000, tax: 0, epf: 2000
    },
];

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        fontFamily: 'sans-serif',
    },
    card: {
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
    },
    header: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1rem',
    },
    subheading: {
        color: '#6b7280',
        marginBottom: '2rem',
    },
    overviewGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    overviewBox: {
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    overviewBoxHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    overviewTitle: {
        fontSize: '1.125rem',
        color: '#4b5563',
        marginBottom: '0.5rem',
    },
    overviewValue: {
        fontSize: '2.25rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    filterBar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem',
    },
    filterItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    input: {
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        width: '100%',
    },
    downloadButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#2563eb',
        color: '#fff',
        borderRadius: '0.75rem',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.2s',
    },
    chartContainer: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
    },
    tableContainer: {
        overflowX: 'auto',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHead: {
        backgroundColor: '#f9fafb',
        color: '#6b7280',
        textTransform: 'uppercase',
        fontSize: '0.875rem',
    },
    th: {
        padding: '1rem',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #e5e7eb',
        transition: 'background-color 0.2s',
    },
    tableRowHover: {
        backgroundColor: '#f3f4f6',
    },
    td: {
        padding: '1rem',
        color: '#4b5563',
    },
};

const PayrollReports = () => {
    const [filters, setFilters] = useState({ month: '', year: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const totalGrossPay = payrollData.reduce((sum, item) => sum + item.grossPay, 0);
    const totalDeductions = payrollData.reduce((sum, item) => sum + item.deductions, 0);
    const totalNetPay = payrollData.reduce((sum, item) => sum + item.netPay, 0);
    const totalTax = payrollData.reduce((sum, item) => sum + item.tax, 0);
    const totalEPF = payrollData.reduce((sum, item) => sum + item.epf, 0);

    const chartData = {
        labels: ['Total Gross Pay', 'Total Deductions', 'Total Net Pay'],
        datasets: [
            {
                label: 'Payroll Summary',
                data: [totalGrossPay, totalDeductions, totalNetPay],
                backgroundColor: ['#10b981', '#ef4444', '#2563eb'],
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Overall Payroll Summary' },
        },
    };

    const handleDownload = () => {
        const csvHeader = 'ID,Employee Name,Month,Year,Gross Pay,Deductions,Net Pay,Tax,EPF\n';
        const csvContent = payrollData.map(item =>
            `${item.id},"${item.employeeName}","${item.month}","${item.year}",${item.grossPay},${item.deductions},${item.netPay},${item.tax},${item.epf}`
        ).join('\n');

        const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'payroll_report.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredPayroll = payrollData.filter(item =>
        item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.month === '' || item.month.toLowerCase() === filters.month.toLowerCase()) &&
        (filters.year === '' || String(item.year) === filters.year)
    );

    const uniqueMonths = [...new Set(payrollData.map(p => p.month))];
    const uniqueYears = [...new Set(payrollData.map(p => String(p.year)))];

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Payroll Reports</h1>
                <p style={styles.subheading}>Analyze and generate detailed payroll reports for all employees.</p>

                {/* Overview Dashboard */}
                <div style={styles.overviewGrid}>
                    <motion.div
                        style={{ ...styles.overviewBox, borderLeftColor: '#10b981' }}
                        whileHover={{ translateY: -5 }}
                    >
                        <p style={styles.overviewTitle}>Total Gross Pay</p>
                        <h2 style={{ ...styles.overviewValue, color: '#10b981' }}>
                            <FaMoneyBillWave /> ₹{totalGrossPay.toLocaleString()}
                        </h2>
                    </motion.div>
                    <motion.div
                        style={{ ...styles.overviewBox, borderLeftColor: '#ef4444' }}
                        whileHover={{ translateY: -5 }}
                    >
                        <p style={styles.overviewTitle}>Total Deductions</p>
                        <h2 style={{ ...styles.overviewValue, color: '#ef4444' }}>
                            <FaCoins /> ₹{totalDeductions.toLocaleString()}
                        </h2>
                    </motion.div>
                    <motion.div
                        style={{ ...styles.overviewBox, borderLeftColor: '#2563eb' }}
                        whileHover={{ translateY: -5 }}
                    >
                        <p style={styles.overviewTitle}>Total Net Pay</p>
                        <h2 style={{ ...styles.overviewValue, color: '#2563eb' }}>
                            <FaHandHoldingUsd /> ₹{totalNetPay.toLocaleString()}
                        </h2>
                    </motion.div>
                    <motion.div
                        style={{ ...styles.overviewBox, borderLeftColor: '#f97316' }}
                        whileHover={{ translateY: -5 }}
                    >
                        <p style={styles.overviewTitle}>Total Tax Paid</p>
                        <h2 style={{ ...styles.overviewValue, color: '#f97316' }}>
                            <FaFileInvoiceDollar /> ₹{totalTax.toLocaleString()}
                        </h2>
                    </motion.div>
                </div>

                {/* Filters and Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'center' } }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', '@media (min-width: 768px)': { flexDirection: 'row' } }}>
                        <div style={{ ...styles.filterItem, flex: 1 }}>
                            <FaSearch color="#6b7280" />
                            <input
                                type="text"
                                placeholder="Search by employee name..."
                                style={styles.input}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div style={{ ...styles.filterItem, flex: 1 }}>
                            <FaFilter color="#6b7280" />
                            <select style={styles.input} value={filters.month} onChange={(e) => setFilters({ ...filters, month: e.target.value })}>
                                <option value="">All Months</option>
                                {uniqueMonths.map(month => <option key={month} value={month}>{month}</option>)}
                            </select>
                        </div>
                        <div style={{ ...styles.filterItem, flex: 1 }}>
                            <FaFilter color="#6b7280" />
                            <select style={styles.input} value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
                                <option value="">All Years</option>
                                {uniqueYears.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        style={styles.downloadButton}
                    >
                        <FaDownload />
                        <span>Download Report</span>
                    </motion.button>
                </div>

                {/* Chart Section */}
                <div style={styles.chartContainer}>
                    <Bar data={chartData} options={chartOptions} />
                </div>

                {/* Report Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Employee Name</th>
                            <th style={styles.th}>Month & Year</th>
                            <th style={styles.th}>Gross Pay</th>
                            <th style={styles.th}>Deductions</th>
                            <th style={styles.th}>Net Pay</th>
                            <th style={styles.th}>Tax</th>
                            <th style={styles.th}>EPF</th>
                        </tr>
                        </thead>
                        <tbody>
                        <AnimatePresence>
                            {filteredPayroll.map(item => (
                                <motion.tr
                                    key={item.id}
                                    style={styles.tableRow}
                                    whileHover={styles.tableRowHover}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <td style={styles.td}>{item.employeeName}</td>
                                    <td style={styles.td}>{item.month} {item.year}</td>
                                    <td style={styles.td}>₹{item.grossPay.toLocaleString()}</td>
                                    <td style={styles.td}>₹{item.deductions.toLocaleString()}</td>
                                    <td style={{ ...styles.td, fontWeight: 'bold' }}>₹{item.netPay.toLocaleString()}</td>
                                    <td style={styles.td}>₹{item.tax.toLocaleString()}</td>
                                    <td style={styles.td}>₹{item.epf.toLocaleString()}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default PayrollReports;