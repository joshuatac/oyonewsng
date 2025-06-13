import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, MessageSquare, User } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import ViewCounter from "@/components/ViewCounter";
import CommentsSection from "@/components/CommentSection";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";


type Post = {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url: string }[];
    "wp:term"?: Array<Array<{ name: string }>>;
  };
};

type RelatedPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  image: string;
};

type Props = {
  post: Post;
  relatedPosts: RelatedPost[];
};



export default function PostContent({ post, relatedPosts }: Props) {
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/800x400?text=No+Image";

  const author = post._embedded?.author?.[0]?.name || "Admin";
  const category =
    post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized";
  const tags =
    post._embedded?.["wp:term"]?.[1]?.map((tag: { name: string }) => tag.name) || [];

const date = format(new Date(post.date), "MMMM d, yyyy"); 
  const postUrl = `https://oyonews.ng/${post.slug}`;

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Featured Image */}
      <div className="relative">
        <Image
          src={featuredImage}
          alt={post.title?.rendered || "Post Image"}
          width={800}
          height={400}
          className="w-full h-64 md:h-96 object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-red-600 text-white">{category}</Badge>
        </div>
      </div>

      {/* Post Body */}
      <div className="p-6">
        <h1
          className="text-2xl md:text-4xl font-bold text-gray-800 mb-4"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {author}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {date}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            <ViewCounter postId={post.id} />
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            0 comments
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-2 mb-6 pb-6 flex-wrap">
          <ShareButtons title={post.title.rendered} url={postUrl} />
        </div>

        {/* Main Content with Ads */}
        
        {/* Tags */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-red-600 border-red-600"
                >
                  {tag}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">No tags</p>
            )}
          </div>
        </div>
      </div>

    
      {/* Related Posts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 text-red-600">Related Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedPosts.length > 0 ? (
            relatedPosts.map((rp) => (
              <Link
                key={rp.id}
                href={`/${rp.slug}`}
                className="flex gap-4 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <Image
                  src={rp.image || "https://via.placeholder.com/80x80?text=No+Image"}
                  alt={rp.title || "Related post image"}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 line-clamp-2 mb-2">
                    {rp.title}
                  </h4>
                  <p className="text-sm text-gray-600">{rp.date}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600">No related posts found.</p>
          )}
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <CommentsSection postId={post.id} />
      </div>
    </article>
  );
}
