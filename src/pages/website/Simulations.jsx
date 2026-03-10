import React, { useState, useRef } from 'react';
import {
    Search, Bell, BookOpen, LayoutDashboard, Microscope, BarChart3, Bot,
    User, Settings, ShieldCheck, History, UserPlus, HeadphonesIcon,
    UploadCloud, Circle, Dot, Smartphone, Monitor, AlertCircle, Rocket,
    FileText, X, Menu
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const templatesData = [
    {
        id: 1,
        title: "Microsoft\nPassword Reset",
        description: "Simulates a high-urgency password expiry notification from Microsoft 365.",
        icon: History,
        iconColor: "text-blue-500",
        iconBg: "bg-blue-500/10",
        from: "Microsoft Security <no-reply@microsoft-auth.com>",
        subject: "Action Required: Your Microsoft 365 password expires in 24 hours",
        previewIcon: ShieldCheck,
        previewIconBg: "bg-blue-600",
        alertTitle: "Security Alert",
        greeting: "Hello user,",
        bodyText: "Your organization's security policy requires a password change every 90 days. Your current password is scheduled to expire at midnight.",
        buttonText: "Keep Current Password",
        buttonColor: "bg-blue-500 hover:bg-blue-600",
        footerText: "This is an automated message. Please do not reply.\n© 2024 Microsoft Corporation. All rights reserved.",
        impact: "High",
        clickRate: "24%",
        impactColor: "text-orange-500",
        impactBg: "bg-orange-950/30",
        impactBorderColor: "border-orange-500/20",
        impactTextColor: "text-orange-200"
    },
    {
        id: 2,
        title: "LinkedIn\nConnection",
        description: "A social engineering hook mimicking a new professional networking request.",
        icon: UserPlus,
        iconColor: "text-slate-400",
        iconBg: "bg-slate-800/50",
        from: "LinkedIn Networking <invitations@linkedin.com>",
        subject: "You have a new connection request from John Doe",
        previewIcon: UserPlus,
        previewIconBg: "bg-blue-700",
        alertTitle: "New Connection Request",
        greeting: "Hi there,",
        bodyText: "John Doe (Senior Software Engineer) would like to connect with you on LinkedIn. Accept the request to expand your professional network.",
        buttonText: "Accept Request",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
        footerText: "This email was intended for you.\n© 2024 LinkedIn Corporation.",
        impact: "Medium",
        clickRate: "18%",
        impactColor: "text-yellow-500",
        impactBg: "bg-yellow-950/30",
        impactBorderColor: "border-yellow-500/20",
        impactTextColor: "text-yellow-200"
    },
    {
        id: 3,
        title: "IT Support Ticket\n ",
        description: "Urgent notice regarding a resolved or pending internal support ticket.",
        icon: HeadphonesIcon,
        iconColor: "text-orange-400",
        iconBg: "bg-slate-800/50",
        from: "IT Helpdesk <support@company-it-portal.com>",
        subject: "[URGENT] Action Required: Ticket #49201 Update",
        previewIcon: HeadphonesIcon,
        previewIconBg: "bg-orange-600",
        alertTitle: "Ticket Requires Attention",
        greeting: "Hello,",
        bodyText: "Your recent IT support ticket (#49201) requires additional verification. Please log in to the portal to confirm your identity so we can proceed.",
        buttonText: "Verify Identity",
        buttonColor: "bg-orange-500 hover:bg-orange-600",
        footerText: "Internal IT Support Staff.\nPlease do not share this link.",
        impact: "Critical",
        clickRate: "32%",
        impactColor: "text-red-500",
        impactBg: "bg-red-950/30",
        impactBorderColor: "border-red-500/20",
        impactTextColor: "text-red-200"
    }
];

const Simulations = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState(['Engineering']);
    const [deliveryMethod, setDeliveryMethod] = useState('staggered');
    const [previewDevice, setPreviewDevice] = useState('monitor');
    const [duration, setDuration] = useState('7 Days (Recommended)');
    const [timeZone, setTimeZone] = useState('UTC-5 (Eastern Time)');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const fileInputRef = useRef(null);

    const departments = ['Human Resources', 'Engineering', 'Sales & Marketing', 'Finance'];

    const handleDepartmentToggle = (dept) => {
        setSelectedDepartments(prev =>
            prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
        );
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file.name);
        }
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setUploadedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleLaunch = () => {
        alert('Simulation Launched Successfully!');
    };

    const handleSaveDraft = () => {
        alert('Draft Saved!');
    };

    const activeTemplate = templatesData.find(t => t.id === selectedTemplate) || templatesData[0];
    const filteredTemplates = templatesData.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#0B1120] text-slate-300 font-sans overflow-hidden">

            {/* Mobile Sidebar Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:relative z-50 w-64 border-r border-slate-800/60 bg-[#0B1120] flex flex-col justify-between h-full flex-shrink-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div>
                    {/* Logo */}
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight">PhishScape</span>
                    </div>

                    {/* Navigation */}
                    <nav className="px-3 py-2 space-y-1">
                        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/" />
                        <NavItem icon={<BookOpen size={20} />} label="Lessons" to="/lessons" />
                        <NavItem icon={<Microscope size={20} />} label="Simulations" active to="/simulations" />
                        <NavItem icon={<BarChart3 size={20} />} label="Analytics" to="/analytics" />
                        <NavItem icon={<Bot size={20} />} label="Ai" to="/ai" />

                        <div className="pt-6 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Account
                        </div>
                        <NavItem icon={<User size={20} />} label="Profile" to="/profile" />
                        <NavItem icon={<Settings size={20} />} label="Settings" to="/settings" />
                    </nav>
                </div>

                {/* User Profile */}
                <div className="p-4 m-4 rounded-xl bg-slate-800/30 border border-slate-700/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex-shrink-0">
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-white truncate">Slama Analyst</span>
                        <span className="text-xs text-blue-400 truncate">Lvl 14 Security</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top Header */}
                <header className="h-20 border-b border-slate-800/60 px-4 md:px-8 flex items-center justify-between shadow-sm z-10 bg-[#0B1120]/80 backdrop-blur-md flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg md:text-xl font-bold text-white max-w-[150px] md:max-w-none truncate">Phish Simulation Launcher</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs font-medium text-emerald-400">Platform Online</span>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-[#0B1120]"></span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto w-full flex flex-col lg:flex-row [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* Left Main Settings Panel */}
                    <div className="flex-1 p-8 lg:border-r border-slate-800/60 flex flex-col">

                        {/* Stepper */}
                        <div className="flex items-center mb-10 text-sm font-semibold">
                            <div className="flex items-center gap-2 text-blue-500">
                                <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center text-xs">1</div>
                                <span>Select Template</span>
                            </div>
                            <div className="w-12 h-px bg-slate-700 mx-4"></div>
                            <div className="flex items-center gap-2 text-slate-500">
                                <div className="w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center text-xs">2</div>
                                <span>Target Audience</span>
                            </div>
                            <div className="w-12 h-px bg-slate-700 mx-4"></div>
                            <div className="flex items-center gap-2 text-slate-500">
                                <div className="w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center text-xs">3</div>
                                <span>Schedule</span>
                            </div>
                        </div>

                        {/* Section 1: Email Template Selection */}
                        <section className="mb-10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">1. Email Template Selection</h2>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Search templates..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {filteredTemplates.map(template => {
                                    const isSelected = selectedTemplate === template.id;
                                    const TemplateIcon = template.icon;
                                    return (
                                        <div
                                            key={template.id}
                                            onClick={() => setSelectedTemplate(template.id)}
                                            className={`bg-[#151D2C] border-2 ${isSelected ? 'border-blue-500' : 'border-slate-700/40 hover:border-slate-600'} rounded-2xl p-5 relative cursor-pointer transition-colors`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                                    Selected
                                                </div>
                                            )}
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${template.iconBg} ${template.iconColor}`}>
                                                <TemplateIcon size={20} />
                                            </div>
                                            <h3 className="font-bold text-white mb-2 whitespace-pre-line">{template.title}</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed">
                                                {template.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Section 2: Target Audience */}
                        <section className="mb-10">
                            <h2 className="text-xl font-bold text-white mb-4">2. Target Audience</h2>
                            <div className="flex gap-6">

                                {/* Upload Panel */}
                                <div
                                    onClick={() => !uploadedFile && fileInputRef.current.click()}
                                    className={`flex-1 bg-transparent border border-dashed border-slate-700/60 ${!uploadedFile ? 'hover:border-slate-500 cursor-pointer' : ''} rounded-2xl flex flex-col items-center justify-center p-8 text-center transition-colors relative`}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        onChange={handleFileUpload}
                                    />
                                    {!uploadedFile ? (
                                        <>
                                            <UploadCloud className="text-slate-400 mb-3" size={28} />
                                            <div className="font-semibold text-white mb-1">Upload Recipient List</div>
                                            <div className="text-sm text-slate-500">Drag & drop CSV or Excel file</div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center w-full">
                                            <div className="p-3 bg-blue-500/10 rounded-full mb-3">
                                                <FileText className="text-blue-400" size={24} />
                                            </div>
                                            <div className="text-sm font-semibold text-white mb-1 px-4 truncate w-full text-center max-w-[200px]" title={uploadedFile}>
                                                {uploadedFile}
                                            </div>
                                            <div className="text-xs text-slate-400 mb-4">Ready for processing</div>
                                            <button
                                                onClick={handleRemoveFile}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                                            >
                                                <X size={14} /> Remove File
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Departments Panel */}
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-white mb-3">Select Departments</div>
                                    <div className="flex flex-wrap gap-2">
                                        {departments.map(dept => (
                                            <button
                                                key={dept}
                                                onClick={() => handleDepartmentToggle(dept)}
                                                className={`px-4 py-2 rounded-xl text-sm transition-colors ${selectedDepartments.includes(dept) ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium' : 'bg-[#151D2C] border border-slate-700/40 text-slate-300 hover:bg-slate-800'}`}
                                            >
                                                {dept}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* Section 3: Schedule & Delivery */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">3. Schedule & Delivery</h2>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div
                                    onClick={() => setDeliveryMethod('staggered')}
                                    className={`bg-[#151D2C] border ${deliveryMethod === 'staggered' ? 'border-blue-500' : 'border-slate-700/40 hover:border-slate-600'} rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-colors`}
                                >
                                    <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${deliveryMethod === 'staggered' ? 'border-blue-500 bg-blue-500' : 'border-slate-500 bg-transparent'}`}>
                                        {deliveryMethod === 'staggered' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white mb-0.5">Staggered Delivery</div>
                                        <div className="text-xs text-slate-400">Distributed over time to bypass filters</div>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setDeliveryMethod('immediate')}
                                    className={`bg-[#151D2C] border ${deliveryMethod === 'immediate' ? 'border-blue-500' : 'border-slate-700/40 hover:border-slate-600'} rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-colors`}
                                >
                                    <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${deliveryMethod === 'immediate' ? 'border-blue-500 bg-blue-500' : 'border-slate-500 bg-transparent'}`}>
                                        {deliveryMethod === 'immediate' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white mb-0.5">Send Immediately</div>
                                        <div className="text-xs text-slate-400">Blast all emails simultaneously</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">Simulation Duration</label>
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-full bg-[#151D2C] border border-slate-700/50 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[position:calc(100%-12px)_center] bg-no-repeat pr-10"
                                    >
                                        <option>7 Days (Recommended)</option>
                                        <option>14 Days</option>
                                        <option>30 Days</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">Time Zone</label>
                                    <select
                                        value={timeZone}
                                        onChange={(e) => setTimeZone(e.target.value)}
                                        className="w-full bg-[#151D2C] border border-slate-700/50 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[position:calc(100%-12px)_center] bg-no-repeat pr-10"
                                    >
                                        <option>UTC-5 (Eastern Time)</option>
                                        <option>UTC-8 (Pacific Time)</option>
                                        <option>UTC+0 (GMT)</option>
                                    </select>
                                </div>
                            </div>

                        </section>

                    </div>

                    {/* Right Live Preview Panel */}
                    <div className="w-full lg:w-[400px] bg-[#0F1523] flex flex-col lg:border-l border-t lg:border-t-0 border-slate-800/60 flex-shrink-0 lg:flex-shrink">

                        {/* Header */}
                        <div className="p-6 pb-4 border-b border-slate-800/60 flex items-center justify-between">
                            <h3 className="font-bold text-white text-lg">Live Preview</h3>
                            <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
                                <button onClick={() => setPreviewDevice('monitor')} className={`p-1.5 rounded ${previewDevice === 'monitor' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'} transition-colors`}>
                                    <Monitor size={16} />
                                </button>
                                <button onClick={() => setPreviewDevice('smartphone')} className={`p-1.5 rounded ${previewDevice === 'smartphone' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'} transition-colors`}>
                                    <Smartphone size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Email Preview Content */}
                        <div className="flex-none lg:flex-1 p-4 lg:p-6 overflow-y-auto bg-[#0B1120]/50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex justify-center">
                            <div className={`w-full bg-[#151D2C] border border-slate-700/40 rounded-xl overflow-hidden shadow-xl transition-all duration-300 ${previewDevice === 'smartphone' ? 'max-w-[320px]' : 'max-w-none'}`}>

                                {/* Email Header */}
                                <div className="p-4 border-b border-slate-700/40 bg-slate-800/20 text-xs text-slate-300 space-y-2">
                                    <div className="flex gap-2">
                                        <span className="text-slate-500 w-12 text-right uppercase tracking-wider font-semibold text-[10px] mt-0.5">From:</span>
                                        <span>{activeTemplate.from}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-slate-500 w-12 text-right uppercase tracking-wider font-semibold text-[10px] mt-0.5">Subject:</span>
                                        <span className="font-semibold text-white">{activeTemplate.subject}</span>
                                    </div>
                                </div>

                                {/* Email Body */}
                                <div className="p-8 flex flex-col items-center min-h-[300px]">
                                    <div className={`mb-6 w-12 h-12 ${activeTemplate.previewIconBg} rounded flex items-center justify-center`}>
                                        <activeTemplate.previewIcon size={28} className="text-white" />
                                    </div>

                                    <h4 className="text-lg font-semibold text-white mb-6">{activeTemplate.alertTitle}</h4>

                                    <p className="text-slate-300 text-sm mb-6 text-center">{activeTemplate.greeting}</p>

                                    <p className="text-slate-400 text-sm text-center mb-8 leading-relaxed max-w-sm">
                                        {activeTemplate.bodyText}
                                    </p>

                                    <button className={`text-white font-medium py-2.5 px-6 rounded w-full mb-8 transition-colors ${activeTemplate.buttonColor}`}>
                                        {activeTemplate.buttonText}
                                    </button>

                                    <div className="text-[10px] text-slate-500 text-center mt-auto whitespace-pre-line">
                                        {activeTemplate.footerText}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="p-6 bg-[#0F1523] border-t border-slate-800/60 z-10">

                            <div className={`${activeTemplate.impactBg} border ${activeTemplate.impactBorderColor} rounded-xl p-4 flex gap-3 mb-6`}>
                                <AlertCircle className={`${activeTemplate.impactColor} flex-shrink-0`} size={20} />
                                <div>
                                    <div className={`${activeTemplate.impactTextColor} text-sm font-semibold mb-1`}>Estimated Impact: {activeTemplate.impact}</div>
                                    <div className={`${activeTemplate.impactTextColor}/70 text-xs`}>This template historically has a {activeTemplate.clickRate} click rate.</div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleSaveDraft}
                                    className="flex-1 py-3 px-4 rounded-xl border border-slate-700 font-semibold text-sm hover:bg-slate-800 transition-colors"
                                >
                                    Save Draft
                                </button>
                                <button
                                    onClick={handleLaunch}
                                    className="flex-[2] py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                                >
                                    <Rocket size={18} /> Launch Simulation
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

/* Helper Component for Sidebar Items */
const NavItem = ({ icon, label, active, to = "#" }) => {
    return (
        <RouterLink to={to} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${active
            ? 'bg-blue-500/10 text-blue-400'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}>
            <div className={`${active ? 'text-blue-500' : 'text-slate-400'}`}>
                {icon}
            </div>
            {label}
        </RouterLink>
    );
};

export default Simulations;
