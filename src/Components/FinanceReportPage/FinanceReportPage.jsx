import React, { useState } from 'react';
import styles from './FinanceReportPage.module.css';
import {
    FiBarChart2,
    FiPieChart,
    FiDownload,
    FiPrinter,
    FiFilter,
    FiCalendar,
    FiDollarSign,
    FiTrendingUp,
    FiTrendingDown
} from 'react-icons/fi';
import { MdOutlineShowChart, MdOutlineAccountBalance } from 'react-icons/md';

const FinanceReportPage = () => {
    const [activeReport, setActiveReport] = useState('overview');
    const [timeRange, setTimeRange] = useState('monthly');
    const [startDate, setStartDate] = useState('2023-01-01');
    const [endDate, setEndDate] = useState('2023-12-31');

    // Sample data
    const financialData = {
        income: 2850000,
        expenses: 1950000,
        balance: 900000,
        transactions: [
            { id: 1, date: '2023-01-05', description: 'Tuition Fees', amount: 450000, type: 'income', category: 'fees' },
            { id: 2, date: '2023-01-10', description: 'Teacher Salaries', amount: 320000, type: 'expense', category: 'salary' },
            { id: 3, date: '2023-01-15', description: 'School Supplies', amount: 75000, type: 'expense', category: 'supplies' },
            // ... more transactions
        ],
        monthlyTrends: [
            { month: 'Jan', income: 450000, expenses: 395000 },
            { month: 'Feb', income: 420000, expenses: 380000 },
            { month: 'Mar', income: 480000, expenses: 410000 },
            // ... more months
        ],
        categoryBreakdown: [
            { category: 'Tuition', amount: 1800000, percentage: 63 },
            { category: 'Donations', amount: 450000, percentage: 16 },
            { category: 'Other Income', amount: 600000, percentage: 21 }
        ],
        expenseCategories: [
            { category: 'Salaries', amount: 1200000, percentage: 62 },
            { category: 'Facilities', amount: 300000, percentage: 15 },
            { category: 'Supplies', amount: 450000, percentage: 23 }
        ]
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const calculatePercentage = (value, total) => {
        return Math.round((value / total) * 100);
    };

    const renderReport = () => {
        switch (activeReport) {
            case 'overview':
                return (
                    <div className={styles.overviewGrid}>
                        <div className={styles.overviewCard}>
                            <h3>Total Income</h3>
                            <div className={styles.amount}>
                                {formatCurrency(financialData.income)}
                                <FiTrendingUp className={styles.trendUp} />
                            </div>
                            <div className={styles.comparison}>+12% from last year</div>
                        </div>

                        <div className={styles.overviewCard}>
                            <h3>Total Expenses</h3>
                            <div className={styles.amount}>
                                {formatCurrency(financialData.expenses)}
                                <FiTrendingDown className={styles.trendDown} />
                            </div>
                            <div className={styles.comparison}>+8% from last year</div>
                        </div>

                        <div className={styles.overviewCard}>
                            <h3>Current Balance</h3>
                            <div className={styles.amount}>
                                {formatCurrency(financialData.balance)}
                            </div>
                            <div className={styles.comparison}>4% increase</div>
                        </div>

                        <div className={styles.chartContainer}>
                            <h3>Monthly Financial Trend</h3>
                            <div className={styles.barChart}>
                                {financialData.monthlyTrends.map((month, index) => (
                                    <div key={index} className={styles.barGroup}>
                                        <div className={styles.barLabel}>{month.month}</div>
                                        <div className={styles.bars}>
                                            <div
                                                className={styles.incomeBar}
                                                style={{ height: `${calculatePercentage(month.income, 600000)}%` }}
                                            ></div>
                                            <div
                                                className={styles.expenseBar}
                                                style={{ height: `${calculatePercentage(month.expenses, 600000)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.chartLegend}>
                                <div className={styles.legendItem}>
                                    <div className={`${styles.legendColor} ${styles.income}`}></div>
                                    <span>Income</span>
                                </div>
                                <div className={styles.legendItem}>
                                    <div className={`${styles.legendColor} ${styles.expense}`}></div>
                                    <span>Expenses</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'income':
                return (
                    <div className={styles.incomeReport}>
                        <div className={styles.pieChartContainer}>
                            <h3>Income Breakdown</h3>
                            <div className={styles.pieChart}>
                                {financialData.categoryBreakdown.map((item, index) => (
                                    <div
                                        key={index}
                                        className={styles.pieSegment}
                                        style={{
                                            '--percentage': `${item.percentage}%`,
                                            '--color': `var(--color-income-${index})`,
                                            '--offset': index === 0 ? 0 :
                                                financialData.categoryBreakdown.slice(0, index).reduce((sum, curr) => sum + curr.percentage, 0)
                                        }}
                                    ></div>
                                ))}
                            </div>
                            <div className={styles.pieLegend}>
                                {financialData.categoryBreakdown.map((item, index) => (
                                    <div key={index} className={styles.legendItem}>
                                        <div
                                            className={styles.legendColor}
                                            style={{ backgroundColor: `var(--color-income-${index})` }}
                                        ></div>
                                        <span>{item.category}</span>
                                        <span>{formatCurrency(item.amount)} ({item.percentage}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.incomeTable}>
                            <h3>Recent Income Transactions</h3>
                            <div className={styles.tableHeader}>
                                <div>Date</div>
                                <div>Description</div>
                                <div>Amount</div>
                            </div>
                            {financialData.transactions
                                .filter(t => t.type === 'income')
                                .slice(0, 5)
                                .map(transaction => (
                                    <div key={transaction.id} className={styles.tableRow}>
                                        <div>{new Date(transaction.date).toLocaleDateString('en-IN')}</div>
                                        <div>{transaction.description}</div>
                                        <div className={styles.incomeAmount}>
                                            {formatCurrency(transaction.amount)}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                );

            case 'expenses':
                return (
                    <div className={styles.expensesReport}>
                        <div className={styles.pieChartContainer}>
                            <h3>Expenses Breakdown</h3>
                            <div className={styles.pieChart}>
                                {financialData.expenseCategories.map((item, index) => (
                                    <div
                                        key={index}
                                        className={styles.pieSegment}
                                        style={{
                                            '--percentage': `${item.percentage}%`,
                                            '--color': `var(--color-expense-${index})`,
                                            '--offset': index === 0 ? 0 :
                                                financialData.expenseCategories.slice(0, index).reduce((sum, curr) => sum + curr.percentage, 0)
                                        }}
                                    ></div>
                                ))}
                            </div>
                            <div className={styles.pieLegend}>
                                {financialData.expenseCategories.map((item, index) => (
                                    <div key={index} className={styles.legendItem}>
                                        <div
                                            className={styles.legendColor}
                                            style={{ backgroundColor: `var(--color-expense-${index})` }}
                                        ></div>
                                        <span>{item.category}</span>
                                        <span>{formatCurrency(item.amount)} ({item.percentage}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.expensesTable}>
                            <h3>Recent Expense Transactions</h3>
                            <div className={styles.tableHeader}>
                                <div>Date</div>
                                <div>Description</div>
                                <div>Amount</div>
                            </div>
                            {financialData.transactions
                                .filter(t => t.type === 'expense')
                                .slice(0, 5)
                                .map(transaction => (
                                    <div key={transaction.id} className={styles.tableRow}>
                                        <div>{new Date(transaction.date).toLocaleDateString('en-IN')}</div>
                                        <div>{transaction.description}</div>
                                        <div className={styles.expenseAmount}>
                                            {formatCurrency(transaction.amount)}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                );

            default:
                return <div>Select a report type</div>;
        }
    };

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <MdOutlineAccountBalance className={styles.headerIcon} />
                        Finance Reports
                    </h1>
                    <p className={styles.subtitle}>
                        Comprehensive financial analysis and insights
                    </p>
                </div>
            </header>

            {/* Report Controls */}
            <div className={styles.controls}>
                <div className={styles.reportTabs}>
                    <button
                        className={`${styles.tab} ${activeReport === 'overview' ? styles.active : ''}`}
                        onClick={() => setActiveReport('overview')}
                    >
                        <FiBarChart2 className={styles.tabIcon} />
                        Overview
                    </button>
                    <button
                        className={`${styles.tab} ${activeReport === 'income' ? styles.active : ''}`}
                        onClick={() => setActiveReport('income')}
                    >
                        <FiTrendingUp className={styles.tabIcon} />
                        Income
                    </button>
                    <button
                        className={`${styles.tab} ${activeReport === 'expenses' ? styles.active : ''}`}
                        onClick={() => setActiveReport('expenses')}
                    >
                        <FiTrendingDown className={styles.tabIcon} />
                        Expenses
                    </button>
                </div>

                <div className={styles.filterControls}>
                    <div className={styles.timeRange}>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>

                    {timeRange === 'custom' && (
                        <div className={styles.dateRange}>
                            <div className={styles.dateInput}>
                                <FiCalendar className={styles.dateIcon} />
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <span>to</span>
                            <div className={styles.dateInput}>
                                <FiCalendar className={styles.dateIcon} />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <button className={styles.filterButton}>
                        <FiFilter className={styles.buttonIcon} />
                        Filters
                    </button>
                </div>

                <div className={styles.exportControls}>
                    <button className={styles.exportButton}>
                        <FiDownload className={styles.buttonIcon} />
                        Export
                    </button>
                    <button className={styles.exportButton}>
                        <FiPrinter className={styles.buttonIcon} />
                        Print
                    </button>
                </div>
            </div>

            {/* Report Content */}
            <div className={styles.reportContent}>
                {renderReport()}
            </div>

            {/* Summary Section */}
            <div className={styles.summary}>
                <div className={styles.summaryCard}>
                    <h3>Key Insights</h3>
                    <ul className={styles.insightsList}>
                        <li>
                            <FiDollarSign className={styles.insightIcon} />
                            Tuition fees account for {financialData.categoryBreakdown[0].percentage}% of total income
                        </li>
                        <li>
                            <FiDollarSign className={styles.insightIcon} />
                            Salaries make up {financialData.expenseCategories[0].percentage}% of total expenses
                        </li>
                        <li>
                            <FiDollarSign className={styles.insightIcon} />
                            Current profit margin: {calculatePercentage(financialData.balance, financialData.income)}%
                        </li>
                    </ul>
                </div>

                <div className={styles.summaryCard}>
                    <h3>Recommendations</h3>
                    <ul className={styles.recommendationsList}>
                        <li>Consider increasing non-tuition revenue streams</li>
                        <li>Review supply expenses for potential savings</li>
                        <li>Plan for upcoming capital expenditures</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FinanceReportPage;