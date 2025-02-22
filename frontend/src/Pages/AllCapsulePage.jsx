import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Smile, Meh, Frown, Lock, Globe, Calendar, Image,
    Film, Heart, MessageCircle, Share2, MoreHorizontal,
    Check, Copy
} from 'lucide-react';
import { UseCapsuleStore } from '../Store/UseCapsuleStore';

const CapsuleDashboard = () => {
    const navigate = useNavigate();
    const [activeCapsules, setActiveCapsules] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [categories, setCategories] = useState({
        all: [],
        positive: [],
        neutral: [],
        negative: []
    });
    const [expandedComments, setExpandedComments] = useState({});
    const [newComments, setNewComments] = useState({});
    const [notification, setNotification] = useState({ show: false, message: '' });

    const { getUserCapsules, getPublicCapsules, loading, likeCapsule, addComment } = UseCapsuleStore();

    useEffect(() => {
        fetchCapsules();
    }, []);

    const fetchCapsules = async () => {
        const userCapsules = await getUserCapsules();
        const publicCapsules = await getPublicCapsules();
        
        // Create a Map to deduplicate capsules based on _id
        const capsuleMap = new Map();
        
        // Add user capsules first
        userCapsules.forEach(capsule => {
            capsuleMap.set(capsule._id, capsule);
        });
        
        // Add public capsules, but only if they're not already in the map
        publicCapsules.forEach(capsule => {
            if (!capsuleMap.has(capsule._id)) {
                capsuleMap.set(capsule._id, capsule);
            }
        });
        
        // Convert map values back to array
        const allCapsules = Array.from(capsuleMap.values());
        categorizeCapsules(allCapsules);
    };

    const categorizeCapsules = (capsules) => {
        const categorized = {
            all: capsules,
            positive: capsules.filter(c => c.analysis?.sentiment === 'positive'),
            neutral: capsules.filter(c => c.analysis?.sentiment === 'neutral'),
            negative: capsules.filter(c => c.analysis?.sentiment === 'negative')
        };
        setCategories(categorized);
        setActiveCapsules(categorized[activeTab]);
    };

    const handleLike = async (capsuleId) => {
        try {
            await likeCapsule(capsuleId);
            // Refresh capsules after like
            fetchCapsules();
            showNotification('Capsule liked successfully!');
        } catch (error) {
            showNotification('Error liking capsule');
        }
    };

    const handleCommentSubmit = async (capsuleId) => {
        if (!newComments[capsuleId]?.trim()) return;

        try {
            await addComment(capsuleId, newComments[capsuleId]);
            setNewComments(prev => ({ ...prev, [capsuleId]: '' }));
            // Refresh capsules after comment
            fetchCapsules();
            showNotification('Comment added successfully!');
        } catch (error) {
            showNotification('Error adding comment');
        }
    };

    const handleShare = async (mediaUrl) => {
        try {
            await navigator.clipboard.writeText(mediaUrl);
            showNotification('Link copied to clipboard!');
        } catch (error) {
            showNotification('Error copying link');
        }
    };

    const showNotification = (message) => {
        setNotification({ show: true, message });
        setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    };

    const getSentimentEmoji = (sentiment) => {
        switch (sentiment) {
            case 'positive':
                return <Smile className="w-5 h-5 text-green-500" />;
            case 'neutral':
                return <Meh className="w-5 h-5 text-yellow-500" />;
            case 'negative':
                return <Frown className="w-5 h-5 text-red-500" />;
            default:
                return <Meh className="w-5 h-5 text-gray-500" />;
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setActiveCapsules(categories[tab]);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const toggleComments = (capsuleId) => {
        setExpandedComments(prev => ({
            ...prev,
            [capsuleId]: !prev[capsuleId]
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Notification Toast */}
            {notification.show && (
                <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                    <Check className="w-4 h-4" />
                    {notification.message}
                </div>
            )}

            <div className="p-6 pt-24 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Time Capsules
                    </h1>
                    <button 
                        onClick={() => navigate('/CreateCapsule')}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Create New Capsule
                    </button>
                </div>

                {/* Tabs */}
                <div className="mb-8 bg-white rounded-xl p-2 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {['all', 'positive', 'neutral', 'negative'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg transition-all ${
                                    activeTab === tab
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Capsule Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {activeCapsules.map((capsule, index) => {
                        const coverMedia = capsule.images[0] || capsule.videos[0];

                        return (
                            <div key={capsule._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                                {/* Card Header */}
                                <div className="relative h-40 bg-gradient-to-r from-indigo-600 to-purple-600">
                                    {coverMedia && (
                                        <img
                                            src={coverMedia}
                                            alt="Capsule cover"
                                            className="w-full h-full object-cover opacity-80"
                                        />
                                    )}
                                    <div className="absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-t from-black/50 to-transparent">
                                        <div className="flex justify-between items-start">
                                            <span className="px-3 py-1 bg-white/90 text-gray-800 rounded-full flex items-center text-sm">
                                                {capsule.isPrivate ? <Lock className="w-4 h-4 mr-1" /> : <Globe className="w-4 h-4 mr-1" />}
                                                {capsule.isPrivate ? 'Private' : 'Public'}
                                            </span>
                                            <button className="p-1 text-white hover:bg-white/20 rounded-full">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">{capsule.title}</h3>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-sm font-medium">{capsule.username}</p>
                                            <p className="text-xs text-gray-500">
                                                Opens {formatDate(capsule.openDate)}
                                            </p>
                                        </div>
                                        {getSentimentEmoji(capsule.analysis?.sentiment)}
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-3">{capsule.content}</p>

                                    {/* Media Section with Share Buttons */}
                                    {(capsule.images?.length > 0 || capsule.videos?.length > 0) && (
                                        <div className="flex flex-wrap gap-4 mb-4 p-2 bg-gray-50 rounded-lg">
                                            {capsule.images?.map((img, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img src={img} alt={`Image ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
                                                    <button
                                                        onClick={() => handleShare(img)}
                                                        className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center rounded"
                                                    >
                                                        <Copy className="w-4 h-4 text-white" />
                                                    </button>
                                                </div>
                                            ))}
                                            {capsule.videos?.map((video, idx) => (
                                                <div key={idx} className="relative group">
                                                    <video className="w-20 h-20 object-cover rounded">
                                                        <source src={video} />
                                                    </video>
                                                    <button
                                                        onClick={() => handleShare(video)}
                                                        className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center rounded"
                                                    >
                                                        <Copy className="w-4 h-4 text-white" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleLike(capsule._id)}
                                                className="flex items-center gap-1 text-rose-600 hover:bg-rose-50 px-2 py-1 rounded"
                                            >
                                                <Heart className="w-4 h-4" />
                                                <span className="text-sm">{capsule.likes}</span>
                                            </button>
                                            <button
                                                onClick={() => toggleComments(capsule._id)}
                                                className="flex items-center gap-1 text-gray-600 hover:bg-gray-100 px-2 py-1 rounded"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="text-sm">{capsule.comments?.length || 0}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Comments Section */}
                                    {expandedComments[capsule._id] && (
                                        <div className="mt-4 pt-4 border-t">
                                            <div className="max-h-48 overflow-y-auto">
                                                {capsule.comments?.map((comment, idx) => (
                                                    <div key={idx} className="flex gap-3 mb-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium">{comment.username}</span>
                                                                <span className="text-xs text-gray-500">
                                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600">{comment.content}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newComments[capsule._id] || ''}
                                                    onChange={(e) => setNewComments(prev => ({
                                                        ...prev,
                                                        [capsule._id]: e.target.value
                                                    }))}
                                                    placeholder="Add a comment..."
                                                    className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleCommentSubmit(capsule._id);
                                                        }
                                                    }}
                                                />
                                                <button
                                                    onClick={() => handleCommentSubmit(capsule._id)}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                                >
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CapsuleDashboard;