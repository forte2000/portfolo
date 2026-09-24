import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faCircleCheck,
    faCopy,
    faHandHoldingHeart,
    faQrcode,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import useSEO from "../../hooks/useSEO";
import { pageVariants, sectionVariants, itemVariants } from "../../config/animations";

const BANK_CONFIG = {
    bankId: "MBBANK", // Ngân hàng MBBank
    accountNo: "0399330519", // Thay bằng số tài khoản của bạn
    accountName: "LUONG TIEN LOI", // Thay bằng tên của bạn
    template: "compact2" // compact, qr_only, compact2, vqr2
};

const SUPPLY_MENU = [
    { label: "Mì tôm", amount: 15000, icon: "🍜" },
    { label: "Cà phê", amount: 35000, icon: "☕" },
    { label: "Cơm gà", amount: 65000, icon: "🍗" },
    { label: "Lẩu mini", amount: 150000, icon: "🍲" }
];

const MEME_MESSAGES = [
    "Ăn ngon ngủ kỹ để có sức đi chơi nhé! ✨",
    "Tiếp tế cho cơn đói bất tận của mình 🍜",
    "Gói mì này chứa đầy tình yêu thương 💖",
    "Một miếng khi đói bằng một gói khi no 🍱",
    "Donate vì sự nghiệp ăn vặt xuyên lục địa 🍬",
    "Số tiền này để đổi lấy cái bụng no nê 🍖"
];

const QUICK_AMOUNTS = [20000, 50000, 100000, 200000, 500000];

function Support() {
    useSEO({
        title: "Nuôi Tôi - Dự án Hành Trình Minh Bạch Của Sự Tin Tưởng",
        description: "Góp phần giúp Forte có tiền mua nhiều mì cay ăn hơn.",
        keywords: "support, donate, nuôi tôi, vietqr, Forte, Yuuk",
        url: "https://forte.is-a.dev/support"
    });

    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [qrUrl, setQrUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Generate QR URL based on VietQR API
    const generateQR = useCallback(() => {
        setIsGenerating(true);
        const description = encodeURIComponent(message || "Support Forte");
        const url = `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-${BANK_CONFIG.template}.png?amount=${amount}&addInfo=${description}&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`;

        // Simulate a brief loading for aesthetic feel
        setTimeout(() => {
            setQrUrl(url);
            setIsGenerating(false);
        }, 500);
    }, [amount, message]);

    useEffect(() => {
        generateQR();
    }, [generateQR]);

    const handleCopyAccount = () => {
        navigator.clipboard.writeText(BANK_CONFIG.accountNo);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    // Format number for display
    const formatAmount = (val) => {
        if (!val) return "";
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        setAmount(rawValue);
    };

    const generateRandomMessage = () => {
        const randomMsg = MEME_MESSAGES[Math.floor(Math.random() * MEME_MESSAGES.length)];
        setMessage(randomMsg);
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="min-h-screen pb-20 px-4 md:px-8"
        >
            {/* Title Section */}
            <motion.div
                className="mb-12 flex items-center gap-3 text-3xl font-extrabold"
                variants={itemVariants}
            >
                <div className="bg-neutral-800 dark:bg-white h-[36px] w-2 rounded"></div>
                <h2 className="dark:text-neutral-200">Dự án Nuôi Tôi 🍲</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left: Info & Form */}
                <motion.div variants={sectionVariants} className="space-y-6">
                    <div className="p-5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow hover:shadow-xl transition relative group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 dark:text-white">
                                <FontAwesomeIcon icon={faHandHoldingHeart} className="text-slate-800 dark:text-slate-200" />
                                Hành Trình Minh Bạch Của Sự Tin Tưởng
                            </h3>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-8">
                                Chào bạn! Đây là "Dự án Nuôi Tôi". Mỗi sự đóng góp của bạn không chỉ là hỗ trợ tài chính,
                                mà còn là những gói mì, ly cà phê giúp mình tiếp tục cống hiến cho ăn vặt của mình.
                                Cảm ơn bạn đã đồng hành cùng chiếc bụng đói của mình! 🍜
                            </p>

                            <div className="space-y-4">
                                {/* Amount Input */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 ml-1 uppercase tracking-wider">Thực đơn tiếp tế</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                                        {SUPPLY_MENU.map((item) => (
                                            <button
                                                key={item.label}
                                                onClick={() => setAmount(item.amount.toString())}
                                                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${amount === item.amount.toString()
                                                    ? "bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-lg"
                                                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-800 dark:hover:border-slate-300"
                                                    }`}
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="text-[10px] font-black uppercase">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Quick numeric amounts */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {QUICK_AMOUNTS.map((amt) => (
                                            <button
                                                key={amt}
                                                onClick={() => setAmount(amt.toString())}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${amount === amt.toString()
                                                    ? "bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-md"
                                                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400"
                                                    }`}
                                            >
                                                {new Intl.NumberFormat('vi-VN').format(amt)}đ
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        value={formatAmount(amount)}
                                        onChange={handleAmountChange}
                                        placeholder="Nhập số tiền tùy chỉnh..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-700 dark:text-white outline-none transition-all placeholder:text-slate-400 text-sm"
                                    />
                                </div>

                                {/* Message Input */}
                                <div>
                                    <div className="flex justify-between items-end mb-2 ml-1">
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lời nhắn</label>
                                        <button
                                            onClick={generateRandomMessage}
                                            className="text-[10px] font-bold text-slate-400 hover:text-slate-800 dark:hover:text-white transition uppercase underline underline-offset-4"
                                        >
                                            Gợi ý lời nhắn?
                                        </button>
                                    </div>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Để lại lời nhắn cho mình nhé..."
                                        rows="3"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-700 dark:text-white outline-none transition-all placeholder:text-slate-400 resize-none text-sm"
                                    />
                                </div>

                                <button
                                    onClick={generateQR}
                                    disabled={isGenerating}
                                    className="w-full py-2.5 mt-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-sm flex items-center justify-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faQrcode} className={`${isGenerating ? 'animate-spin' : ''}`} />
                                    <span>CẬP NHẬT MÃ QR</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg">
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Số tài khoản</p>
                                <p className="text-lg font-bold dark:text-white tracking-wider">{BANK_CONFIG.accountNo}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCopyAccount}
                            className={`p-3 rounded-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            <FontAwesomeIcon icon={copied ? faCircleCheck : faCopy} />
                        </button>
                    </div>
                </motion.div>

                {/* Right: QR Display */}
                <motion.div variants={sectionVariants} className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative group max-w-sm w-full">
                        <div className="relative bg-slate-50 dark:bg-slate-800 p-5 rounded-xl shadow border border-slate-200 dark:border-slate-700 transition hover:shadow-xl">
                            <div className="absolute top-4 right-4 z-10">
                                <div className="w-8 h-8 rounded-full bg-slate-800 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-xs shadow-lg">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                            </div>

                            {/* QR Image Container */}
                            <div className="aspect-square w-full rounded-lg overflow-hidden bg-white flex items-center justify-center relative border border-slate-200 dark:border-slate-700">
                                <AnimatePresence mode="wait">
                                    {isGenerating ? (
                                        <motion.div
                                            key="loader"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/90 backdrop-blur-sm z-10"
                                        >
                                            <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-800 dark:border-t-white rounded-full animate-spin"></div>
                                            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Generating...</span>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>

                                <img
                                    src={qrUrl}
                                    alt="VietQR Support"
                                    className={`w-full h-full object-contain transition-all duration-700 ${isGenerating ? 'scale-90 blur-sm opacity-50' : 'scale-100 blur-0 opacity-100'}`}
                                />
                            </div>

                            <div className="mt-5 text-center">
                                <p className="text-slate-800 dark:text-white font-bold text-sm">Quét mã để ủng hộ</p>
                                <div className="mt-3 flex items-center justify-center gap-2">
                                    <span className="px-2 py-1 bg-white dark:bg-slate-700 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600">MBBANK</span>
                                    <span className="px-2 py-1 bg-white dark:bg-slate-700 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600">VIETQR.IO</span>
                                </div>
                            </div>
                        </div>

                        {/* Safety badge */}
                        <div className="mt-8 flex items-center gap-3 justify-center text-slate-400 dark:text-slate-500">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                            <span className="text-xs font-medium">Giao dịch an toàn & trực tiếp</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Quote */}
            <motion.div
                variants={itemVariants}
                className="mt-20 text-center max-w-xl mx-auto"
            >
                <p className="text-slate-400 italic text-sm">
                    "Một miếng khi đói bằng một gói khi no. Cảm ơn vì đã không để mình bị 'đói' ý tưởng và 'đói' cả cơm!"
                </p>
            </motion.div>
        </motion.div>
    );
}

export default Support;
