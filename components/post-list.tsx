"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  Heart,
  MessageCircle,
  Share2,
  UserPlus,
  UserMinus,
  Copy,
  Twitter,
  Facebook,
  Star,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const PostList = ({ mockPosts }) => {
  const [followStates, setFollowStates] = useState({});
  const [favoriteStates, setFavoriteStates] = useState({});
  const [likeStates, setLikeStates] = useState({});
  const [commentStates, setCommentStates] = useState({});
  const [shareStates, setShareStates] = useState({});
  const [newComments, setNewComments] = useState({});

  const toggleFollow = (userName) => {
    setFollowStates(prev => ({
      ...prev,
      [userName]: !prev[userName]
    }));
  };

  const toggleFavorite = (postId) => {
    setFavoriteStates(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleLike = (postId) => {
    setLikeStates(prev => ({
      ...prev,
      [postId]: {
        isLiked: !prev[postId]?.isLiked,
        count: prev[postId]?.isLiked 
          ? (prev[postId]?.count || 0) - 1 
          : (prev[postId]?.count || 0) + 1
      }
    }));
  };

  const toggleComments = (postId) => {
    setCommentStates(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        showComments: !prev[postId]?.showComments,
        comments: prev[postId]?.comments || [
          "Amazing work! Love the details.",
          "This character design is incredible!",
          "Can't wait to see more of this OC!"
        ]
      }
    }));
  };

  const toggleShareModal = (postId) => {
    setShareStates(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const addComment = (postId) => {
    const newComment = newComments[postId];
    if (!newComment?.trim()) return;

    setCommentStates(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        comments: [...(prev[postId]?.comments || []), newComment]
      }
    }));

    setNewComments(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const copyToClipboard = (postId) => {
    const url = `${window.location.origin}/character/${postId}`;
    navigator.clipboard.writeText(url);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'border-green-300 text-green-700';
      case 'busy':
        return 'border-yellow-300 text-yellow-700';
      case 'offline':
        return 'border-red-300 text-red-700';
      default:
        return 'border-purple-300 text-purple-700';
    }
  };

  const getStatusIcon = (status) => {
    // You can add appropriate icons here based on status
    return null;
  };

  if (!mockPosts || mockPosts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-purple-600">No posts to display</p>
        <Button asChild>
          <Link href="/create" className="mt-4">
            Create your first OC
          </Link>
        </Button>
        <p className="mt-2">Start sharing your OCs and connect with others!</p>
        <p>
          <Link href="/explore" className="text-purple-500 hover:underline">
            Explore existing OCs
          </Link>
          {" "}to get inspired and see what others are creating.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {mockPosts.map((post) => (
        <Card key={post.id} className="border-purple-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-purple-200 text-purple-800">
                    {post.user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-purple-900">{post.user.name}</h3>
                  <p className="text-sm text-purple-600">{post.user.followers} followers</p>
                </div>
              </div>
              <Button
                variant={followStates[post.user.name] ? "outline" : "default"}
                size="sm"
                onClick={() => toggleFollow(post.user.name)}
                className={
                  followStates[post.user.name]
                    ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }
              >
                {followStates[post.user.name] ? (
                  <>
                    <UserMinus className="h-4 w-4 mr-1" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Link href={`/character/${post.id}`}>
                    <h4 className="text-xl font-bold text-purple-900 hover:text-purple-700 transition-colors cursor-pointer">
                      {post.character}
                    </h4>
                  </Link>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {post.type}
                  </Badge>
                  <Badge variant="outline" className={`${getStatusColor(post.status)} flex items-center gap-1`}>
                    {getStatusIcon(post.status)}
                    {post.status}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(post.id)}
                  className={`${
                    favoriteStates[post.id]
                      ? "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                      : "text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                  }`}
                >
                  <Star className={`h-5 w-5 ${favoriteStates[post.id] ? "fill-current" : ""}`} />
                </Button>
              </div>
              <p className="text-purple-700">{post.description}</p>
            </div>

            <div className="grid gap-2">
              {post.images?.length === 1 ? (
                <Image
                  src={post.images[0] || "/placeholder.svg"}
                  alt={post.character}
                  width={600}
                  height={400}
                  className="w-full rounded-lg object-cover"
                />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {post.images?.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img || "/placeholder.svg"}
                      alt={`${post.character} ${idx + 1}`}
                      width={300}
                      height={300}
                      className="w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-purple-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleLike(post.id)}
                className={`${
                  likeStates[post.id]?.isLiked
                    ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                    : "text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                }`}
              >
                <Heart className={`h-4 w-4 mr-1 ${likeStates[post.id]?.isLiked ? "fill-current" : ""}`} />
                {likeStates[post.id]?.count || post.likes}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleComments(post.id)}
                className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.comments}
              </Button>

              <Dialog open={shareStates[post.id]} onOpenChange={() => toggleShareModal(post.id)}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share {post.character}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <label htmlFor="link" className="sr-only">
                          Link
                        </label>
                        <Input
                          id="link"
                          defaultValue={`${typeof window !== 'undefined' ? window.location.origin : ''}/character/${post.id}`}
                          readOnly
                          className="border-purple-200"
                        />
                      </div>
                      <Button
                        size="sm"
                        className="px-3 bg-purple-600 hover:bg-purple-700"
                        onClick={() => copyToClipboard(post.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() =>
                          typeof window !== 'undefined' && window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + "/character/" + post.id)}&text=${encodeURIComponent("Check out this amazing OC: " + post.character)}`,
                            "_blank",
                          )
                        }
                      >
                        <Twitter className="h-4 w-4 text-sky-500" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() =>
                          typeof window !== 'undefined' && window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + "/character/" + post.id)}`,
                            "_blank",
                          )
                        }
                      >
                        <Facebook className="h-4 w-4 text-blue-600" />
                        Facebook
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {commentStates[post.id]?.showComments && (
              <div className="space-y-4 pt-4 border-t border-purple-200">
                <h4 className="font-semibold text-purple-900">Comments</h4>

                {/* Existing Comments */}
                <div className="space-y-3">
                  {commentStates[post.id]?.comments.map((comment, idx) => (
                    <div key={idx} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                          U{idx + 1}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-purple-50 rounded-lg p-3">
                          <p className="text-sm text-purple-800">{comment}</p>
                        </div>
                        <p className="text-xs text-purple-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">AC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Write a comment..."
                      value={newComments[post.id] || ""}
                      onChange={(e) => setNewComments((prev) => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addComment(post.id)
                        }
                      }}
                      className="border-purple-200 focus:border-purple-500"
                    />
                    <Button
                      size="sm"
                      onClick={() => addComment(post.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostList;