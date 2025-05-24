import React, { useState } from 'react';
import { MessageSquare, Calendar, User, Clock, ThumbsUp, Share2, Flag, ChevronDown, Search, Filter } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface Post {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: Date;
  category: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  neighborhood: string;
}

interface Comment {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

const CommunityPage: React.FC = () => {
  const { isAuthenticated, user } = useUser();
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostCategory, setNewPostCategory] = useState('general');
  
  // Mock data - would come from API in real implementation
  const mockPosts: Post[] = [
    {
      id: '1',
      author: 'Maria Rodriguez',
      authorId: 'user1',
      content: 'Has anyone noticed increased police presence around Fordham Plaza this week? They seem to be patrolling more frequently, which is great to see.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      category: 'safety',
      likes: 15,
      comments: 7,
      isLiked: false,
      neighborhood: 'Fordham',
    },
    {
      id: '2',
      author: 'James Wilson',
      authorId: 'user2',
      content: 'The streetlights on 167th Street between Grand Concourse and Jerome Ave have been out for a week now. It\'s very dark at night and doesn\'t feel safe. Has anyone reported this to 311?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      category: 'infrastructure',
      likes: 23,
      comments: 12,
      isLiked: true,
      neighborhood: 'Concourse',
    },
    {
      id: '3',
      author: 'Sophia Chen',
      authorId: 'user3',
      content: 'I\'m organizing a community cleanup this Saturday in Crotona Park. We\'ll be meeting at 10 AM by the main entrance. Would love to have more neighbors join us! Clean parks are safer parks.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      category: 'event',
      likes: 41,
      comments: 18,
      isLiked: false,
      neighborhood: 'Crotona',
    },
    {
      id: '4',
      author: 'Michael Johnson',
      authorId: 'user4',
      content: 'Just a heads up that there\'s a new safety workshop being offered at the community center on Webster Ave. They\'re teaching basic self-defense and safety awareness. It\'s free for residents.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
      category: 'resource',
      likes: 32,
      comments: 5,
      isLiked: false,
      neighborhood: 'Tremont',
    },
    {
      id: '5',
      author: 'Aisha Williams',
      authorId: 'user5',
      content: 'I noticed some suspicious activity near the bodega on 183rd and Valentine Ave around midnight last night. Two people seemed to be casing the store. I reported it to 311, but wanted to let neighbors know to be vigilant.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      category: 'safety',
      likes: 18,
      comments: 23,
      isLiked: true,
      neighborhood: 'Fordham',
    },
  ];
  
  const mockComments: Record<string, Comment[]> = {
    '1': [
      {
        id: 'c1',
        author: 'David Ortiz',
        authorId: 'user7',
        content: 'Yes, I\'ve noticed more officers on foot patrol. I think it\'s part of their new community policing initiative.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        likes: 5,
        isLiked: false,
      },
      {
        id: 'c2',
        author: 'Lisa Cooper',
        authorId: 'user8',
        content: 'I spoke with an officer yesterday. They said they\'re increasing visibility in response to community feedback.',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
        likes: 3,
        isLiked: true,
      },
    ],
  };
  
  const categories = [
    { id: 'safety', name: 'Safety Concerns' },
    { id: 'resource', name: 'Resources' },
    { id: 'event', name: 'Events' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'general', name: 'General Discussion' },
  ];
  
  const neighborhoods = [
    'Fordham',
    'South Bronx',
    'Tremont',
    'Concourse',
    'Mott Haven',
    'Highbridge',
    'Morrisania',
    'Crotona',
    'University Heights',
    'Morris Heights',
  ];
  
  const filteredPosts = mockPosts.filter((post) => {
    if (selectedCategory && post.category !== selectedCategory) return false;
    if (selectedNeighborhood && post.neighborhood !== selectedNeighborhood) return false;
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  
  const toggleLike = (postId: string) => {
    // In a real app, this would call an API to update the like status
    console.log(`Toggle like for post ${postId}`);
  };
  
  const toggleExpandPost = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };
  
  const handleSubmitNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the new post to an API
    console.log('New post:', newPostContent, newPostCategory);
    setNewPostContent('');
    setShowNewPostForm(false);
    // Add success message or redirect
  };
  
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety':
        return 'bg-red-100 text-red-800';
      case 'resource':
        return 'bg-blue-100 text-blue-800';
      case 'event':
        return 'bg-green-100 text-green-800';
      case 'infrastructure':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Community Discussion</h1>
            <button
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className={`px-4 py-2 rounded-md font-medium text-sm ${
                isAuthenticated
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isAuthenticated}
            >
              {showNewPostForm ? 'Cancel' : 'New Post'}
            </button>
          </div>

          {/* New Post Form */}
          {showNewPostForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Post</h2>
              <form onSubmit={handleSubmitNewPost}>
                <div className="mb-4">
                  <label htmlFor="post-category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="post-category"
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="post-content"
                    rows={4}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share safety information, ask questions, or connect with your community..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Post Message
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center mb-3">
              <Filter size={16} className="text-gray-500 mr-2" />
              <h2 className="text-sm font-medium text-gray-700">Filter Posts</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search-posts" className="block text-xs text-gray-600 mb-1">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search-posts"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search discussions..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="category-filter" className="block text-xs text-gray-600 mb-1">
                  Category
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="neighborhood-filter" className="block text-xs text-gray-600 mb-1">
                  Neighborhood
                </label>
                <select
                  id="neighborhood-filter"
                  value={selectedNeighborhood || ''}
                  onChange={(e) => setSelectedNeighborhood(e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Neighborhoods</option>
                  {neighborhoods.map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          <User size={20} />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">{post.author}</h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            <span>{formatTimeAgo(post.timestamp)}</span>
                            <span className="mx-1">•</span>
                            <span>{post.neighborhood}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                        {categories.find(c => c.id === post.category)?.name || 'General'}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex space-x-4">
                        <button
                          className={`flex items-center text-sm ${
                            post.isLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                          }`}
                          onClick={() => toggleLike(post.id)}
                        >
                          <ThumbsUp size={16} className="mr-1" />
                          <span>{post.likes}</span>
                        </button>
                        <button
                          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                          onClick={() => toggleExpandPost(post.id)}
                        >
                          <MessageSquare size={16} className="mr-1" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                          <Share2 size={16} className="mr-1" />
                          <span>Share</span>
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <Flag size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Comments Section */}
                  {expandedPost === post.id && (
                    <div className="bg-gray-50 p-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Comments</h4>
                      
                      {mockComments[post.id] ? (
                        <div className="space-y-3">
                          {mockComments[post.id].map((comment) => (
                            <div key={comment.id} className="bg-white p-3 rounded-md border border-gray-200">
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-2">
                                  <User size={16} />
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-gray-800">{comment.author}</h5>
                                  <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                              <div className="flex items-center text-xs">
                                <button
                                  className={`flex items-center ${
                                    comment.isLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                                  }`}
                                  onClick={() => console.log(`Like comment ${comment.id}`)}
                                >
                                  <ThumbsUp size={12} className="mr-1" />
                                  <span>{comment.likes}</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No comments yet.</p>
                      )}
                      
                      {isAuthenticated ? (
                        <div className="mt-4">
                          <textarea
                            placeholder="Write a comment..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            rows={2}
                          ></textarea>
                          <div className="mt-2 flex justify-end">
                            <button
                              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
                          <p className="text-sm text-blue-700">
                            <a href="/account" className="font-medium hover:underline">Sign in</a> to join the conversation and post comments.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-3">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No discussions found</h3>
                <p className="text-gray-600">
                  {searchQuery || selectedCategory || selectedNeighborhood
                    ? 'Try changing your filters to see more posts.'
                    : 'Be the first to start a discussion in your community!'}
                </p>
              </div>
            )}
          </div>
          
          {/* Community Guidelines */}
          <div className="mt-8 bg-blue-50 rounded-lg border border-blue-100 p-4">
            <h3 className="text-md font-medium text-blue-800 mb-2">Community Guidelines</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Be respectful and supportive of your neighbors</li>
              <li>• Focus on safety information and community building</li>
              <li>• Do not share personally identifying information</li>
              <li>• Report incidents to authorities before posting</li>
              <li>• Flag inappropriate content for moderator review</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;