
// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

// // Types
// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   username?: string;
//   email_verified?: string;
//   image?: string;
//   created_at?: string;
//   updated_at?: string;
//   bio?: string;
//   location?: string;
//   followers?: number;
//   following?: number;
//   characters?: number;
// }

// export interface Character {
//   id: string;
//   name: string;
//   image?: string;
//   shortDescription?: string;
//   fullDescription?: string;
//   age?: string;
//   species?: string;
//   occupation?: string;
//   location?: string;
//   height?: string;
//   personalityTraits: string[];
//   abilities: string[];
//   interests: string[];
//   dislikes: string[];
//   tags: string[];
//   colorPalette: ColorPalette[];
//   likes: number;
//   views: number;
//   createdBy: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ColorPalette {
//   name: string;
//   hex: string;
//   description: string;
// }

// export interface Post {
//   id: string;
//   characterId: string;
//   userId: string;
//   user: {
//     name: string;
//     username: string;
//     avatar?: string;
//   };
//   character: {
//     name: string;
//     image?: string;
//   };
//   content?: string;
//   images: string[];
//   likes: number;
//   comments: number;
//   views: number;
//   tags: string[];
//   createdAt: string;
// }

// export interface Creator {
//   id: string;
//   displayName: string;
//   username: string;
//   avatar?: string;
//   bio?: string;
//   specialties: string[];
//   followers: number;
//   totalLikes: number;
//   totalCharacters: number;
//   lastActive: string;
//   newPosts: number;
//   isFollowing: boolean;
// }

// // Store interface
// interface AppStore {
//   // Auth state
//   user: User | null;
//   authLoading: boolean;
  
//   // Characters state
//   characters: Character[];
//   userCharacters: Character[];
//   featuredCharacters: Character[];
//   charactersLoading: boolean;
  
//   // Posts state
//   posts: Post[];
//   userPosts: Post[];
//   feedPosts: Post[];
//   postsLoading: boolean;
  
//   // Social state
//   following: Creator[];
//   followers: Creator[];
//   favorites: string[]; // character IDs
//   socialLoading: boolean;
  
//   // UI state
//   searchTerm: string;
//   sortBy: string;
//   filterBy: string;
//   viewMode: 'grid' | 'list';
  
//   // Actions
//   setUser: (user: User | null) => void;
//   setAuthLoading: (loading: boolean) => void;
  
//   setCharacters: (characters: Character[]) => void;
//   setUserCharacters: (characters: Character[]) => void;
//   setFeaturedCharacters: (characters: Character[]) => void;
//   addCharacter: (character: Character) => void;
//   updateCharacter: (id: string, updates: Partial<Character>) => void;
//   deleteCharacter: (id: string) => void;
//   setCharactersLoading: (loading: boolean) => void;
  
//   setPosts: (posts: Post[]) => void;
//   setUserPosts: (posts: Post[]) => void;
//   setFeedPosts: (posts: Post[]) => void;
//   addPost: (post: Post) => void;
//   updatePost: (id: string, updates: Partial<Post>) => void;
//   deletePost: (id: string) => void;
//   setPostsLoading: (loading: boolean) => void;
  
//   setFollowing: (following: Creator[]) => void;
//   setFollowers: (followers: Creator[]) => void;
//   addToFavorites: (characterId: string) => void;
//   removeFromFavorites: (characterId: string) => void;
//   toggleFollow: (creatorId: string) => void;
//   setSocialLoading: (loading: boolean) => void;
  
//   setSearchTerm: (term: string) => void;
//   setSortBy: (sort: string) => void;
//   setFilterBy: (filter: string) => void;
//   setViewMode: (mode: 'grid' | 'list') => void;
  
//   // Data fetching actions
//   fetchUserCharacters: () => Promise<void>;
//   fetchFeedPosts: () => Promise<void>;
//   fetchFollowing: () => Promise<void>;
//   fetchFavorites: () => Promise<void>;
// }

// // Create the store
// export const useAppStore = create<AppStore>()(
//   devtools(
//     (set, get) => ({
//       // Initial state
//       user: null,
//       authLoading: true,
      
//       characters: [],
//       userCharacters: [],
//       featuredCharacters: [],
//       charactersLoading: false,
      
//       posts: [],
//       userPosts: [],
//       feedPosts: [],
//       postsLoading: false,
      
//       following: [],
//       followers: [],
//       favorites: [],
//       socialLoading: false,
      
//       searchTerm: '',
//       sortBy: 'recent',
//       filterBy: 'all',
//       viewMode: 'grid',
      
//       // Auth actions
//       setUser: (user) => set({ user }),
//       setAuthLoading: (authLoading) => set({ authLoading }),
      
//       // Character actions
//       setCharacters: (characters) => set({ characters }),
//       setUserCharacters: (userCharacters) => set({ userCharacters }),
//       setFeaturedCharacters: (featuredCharacters) => set({ featuredCharacters }),
//       addCharacter: (character) => set((state) => ({
//         characters: [...state.characters, character],
//         userCharacters: [...state.userCharacters, character]
//       })),
//       updateCharacter: (id, updates) => set((state) => ({
//         characters: state.characters.map(c => c.id === id ? { ...c, ...updates } : c),
//         userCharacters: state.userCharacters.map(c => c.id === id ? { ...c, ...updates } : c)
//       })),
//       deleteCharacter: (id) => set((state) => ({
//         characters: state.characters.filter(c => c.id !== id),
//         userCharacters: state.userCharacters.filter(c => c.id !== id)
//       })),
//       setCharactersLoading: (charactersLoading) => set({ charactersLoading }),
      
//       // Post actions
//       setPosts: (posts) => set({ posts }),
//       setUserPosts: (userPosts) => set({ userPosts }),
//       setFeedPosts: (feedPosts) => set({ feedPosts }),
//       addPost: (post) => set((state) => ({
//         posts: [...state.posts, post],
//         feedPosts: [...state.feedPosts, post]
//       })),
//       updatePost: (id, updates) => set((state) => ({
//         posts: state.posts.map(p => p.id === id ? { ...p, ...updates } : p),
//         feedPosts: state.feedPosts.map(p => p.id === id ? { ...p, ...updates } : p)
//       })),
//       deletePost: (id) => set((state) => ({
//         posts: state.posts.filter(p => p.id !== id),
//         feedPosts: state.feedPosts.filter(p => p.id !== id)
//       })),
//       setPostsLoading: (postsLoading) => set({ postsLoading }),
      
//       // Social actions
//       setFollowing: (following) => set({ following }),
//       setFollowers: (followers) => set({ followers }),
//       addToFavorites: (characterId) => set((state) => ({
//         favorites: [...state.favorites, characterId]
//       })),
//       removeFromFavorites: (characterId) => set((state) => ({
//         favorites: state.favorites.filter(id => id !== characterId)
//       })),
//       toggleFollow: (creatorId) => set((state) => ({
//         following: state.following.map(creator => 
//           creator.id === creatorId 
//             ? { ...creator, isFollowing: !creator.isFollowing }
//             : creator
//         )
//       })),
//       setSocialLoading: (socialLoading) => set({ socialLoading }),
      
//       // UI actions
//       setSearchTerm: (searchTerm) => set({ searchTerm }),
//       setSortBy: (sortBy) => set({ sortBy }),
//       setFilterBy: (filterBy) => set({ filterBy }),
//       setViewMode: (viewMode) => set({ viewMode }),
      
//       // Data fetching actions (these would integrate with Supabase)
//       fetchUserCharacters: async () => {
//         const { user } = get();
//         if (!user) return;
        
//         set({ charactersLoading: true });
//         try {
//           // TODO: Replace with actual Supabase call when database is set up
//           // const { data } = await supabase.from('characters').select('*').eq('created_by', user.id);
          
//           // Mock data for demonstration - only show if user exists
//           const mockCharacters: Character[] = [
//             {
//               id: '1',
//               name: 'Luna Nightshade',
//               shortDescription: 'A mysterious vampire with ancient powers',
//               fullDescription: 'Luna is a centuries-old vampire who has witnessed the rise and fall of empires.',
//               age: '300+',
//               species: 'Vampire',
//               occupation: 'Night Scholar',
//               location: 'Gothic Manor',
//               height: '5\'7"',
//               personalityTraits: ['Mysterious', 'Intelligent', 'Elegant'],
//               abilities: ['Blood Magic', 'Shadow Control', 'Enhanced Senses'],
//               interests: ['Ancient Literature', 'Art History', 'Astronomy'],
//               dislikes: ['Sunlight', 'Garlic', 'Shallow Conversation'],
//               tags: ['vampire', 'gothic', 'supernatural'],
//               colorPalette: [
//                 { name: 'Midnight Purple', hex: '#2D1B69', description: 'Signature color' },
//                 { name: 'Blood Red', hex: '#DC2626', description: 'Accent color' }
//               ],
//               likes: 156,
//               views: 892,
//               createdBy: user.id,
//               createdAt: new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//             },
//             {
//               id: '2',
//               name: 'Kai Stormwind',
//               shortDescription: 'A brave dragon rider from the sky kingdoms',
//               fullDescription: 'Kai soars through the clouds on his dragon companion, protecting the realm.',
//               age: '24',
//               species: 'Human',
//               occupation: 'Dragon Rider',
//               location: 'Sky Citadel',
//               height: '6\'0"',
//               personalityTraits: ['Brave', 'Loyal', 'Adventurous'],
//               abilities: ['Dragon Bond', 'Storm Magic', 'Aerial Combat'],
//               interests: ['Flying', 'Dragon Care', 'Weather Magic'],
//               dislikes: ['Being grounded', 'Corruption', 'Injustice'],
//               tags: ['dragon', 'fantasy', 'adventure'],
//               colorPalette: [
//                 { name: 'Storm Blue', hex: '#1E40AF', description: 'Primary color' },
//                 { name: 'Lightning Gold', hex: '#F59E0B', description: 'Accent color' }
//               ],
//               likes: 203,
//               views: 1245,
//               createdBy: user.id,
//               createdAt: new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//             }
//           ];
          
//           set({ userCharacters: mockCharacters, characters: mockCharacters });
//         } catch (error) {
//           console.error('Error fetching user characters:', error);
//         } finally {
//           set({ charactersLoading: false });
//         }
//       },
      
//       fetchFeedPosts: async () => {
//         set({ postsLoading: true });
//         try {
//           // This would be replaced with actual Supabase call
//           // const { data } = await supabase.from('posts').select('*, user(*), character(*)').order('created_at', { ascending: false });
//           // set({ feedPosts: data || [] });
          
//           // Mock data for now
//           set({ feedPosts: [] });
//         } catch (error) {
//           console.error('Error fetching feed posts:', error);
//         } finally {
//           set({ postsLoading: false });
//         }
//       },
      
//       fetchFollowing: async () => {
//         const { user } = get();
//         if (!user) return;
        
//         set({ socialLoading: true });
//         try {
//           // Mock following data
//           const mockFollowing: Creator[] = [
//             {
//               id: '1',
//               displayName: 'ArtistAlice',
//               username: 'alice_creates',
//               bio: 'Digital artist specializing in fantasy characters',
//               specialties: ['Fantasy', 'Digital Art', 'Character Design'],
//               followers: 1250,
//               totalLikes: 5600,
//               totalCharacters: 23,
//               lastActive: '2 hours ago',
//               newPosts: 2,
//               isFollowing: true
//             },
//             {
//               id: '2',
//               displayName: 'DragonMaster',
//               username: 'dragon_tales',
//               bio: 'Creator of epic dragon characters and stories',
//               specialties: ['Dragons', 'Epic Fantasy', 'Lore'],
//               followers: 890,
//               totalLikes: 3400,
//               totalCharacters: 15,
//               lastActive: '1 day ago',
//               newPosts: 0,
//               isFollowing: true
//             }
//           ];
          
//           set({ following: mockFollowing });
//         } catch (error) {
//           console.error('Error fetching following:', error);
//         } finally {
//           set({ socialLoading: false });
//         }
//       },
      
//       fetchFavorites: async () => {
//         const { user } = get();
//         if (!user) return;
        
//         try {
//           // Mock favorites data
//           set({ favorites: ['1'] }); // Luna Nightshade is favorited
//         } catch (error) {
//           console.error('Error fetching favorites:', error);
//         }
//       }
//     }),
//     {
//       name: 'ocera-store'
//     }
//   )
// );
