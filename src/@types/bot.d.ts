export type BotKind = 'private' | 'mixed';

export type BotMeta = {
  id: string;
  title: string;
  description: string;
  createTime: Date;
  lastUsedTime: Date;
  isPublic: boolean;
  isPinned: boolean;
  owned: boolean;
  syncStatus: BotSyncStatus;
};

export type BotKnowledge = {
  sourceUrls: string[];
  // Sitemap cannot be used yet.
  sitemapUrls: string[];
  filenames: string[];
};

export type EmdeddingPrams = {
  chunkSize: number;
  chunkOverlap: number;
};

export type BotKnowledgeDiff = {
  sourceUrls: string[];
  // Sitemap cannot be used yet.
  sitemapUrls: string[];
  addedFilenames: string[];
  deletedFilenames: string[];
  unchangedFilenames: string[];
};

export type BotSyncStatus = 'QUEUED' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';

export type BotListItem = BotMeta & {
  available: boolean;
};

export type BotDetails = BotMeta & {
  instruction: string;
  embeddingParams: EmdeddingPrams;
  knowledge: BotKnowledge;
  syncStatusReason: string;
};

export type BotSummary = BotMeta & {
  hasKnowledge: boolean;
};

export type BotFile = {
  filename: string;
  status: 'UPLOADING' | 'UPLOADED' | 'ERROR';
  errorMessage?: string;
  progress?: number;
};

export type SelectedBucketFiles = {
  // [x: string]: any;
  filePath: string;
  isCheck: boolean;
};

export type RegisterBotRequest = {
  id: string;
  title: string;
  instruction: string;
  description?: string;
  embeddingParams?: EmdeddingPrams;
  knowledge?: BotKnowledge;
};

export type RegisterBotResponse = BotDetails;

export type UpdateBotRequest = {
  title: string;
  instruction: string;
  description?: string;
  embeddingParams?: EmdeddingPrams;
  knowledge?: BotKnowledgeDiff;
};

export type UpdateBotResponse = {
  id: string;
  title: string;
  instruction: string;
  description: string;
  embeddingParams?: EmdeddingPrams;
  knowledge?: BotKnowledge;
};

export type UpdateBotPinnedRequest = {
  pinned: boolean;
};

export type UpdateBotPinnedResponse = null;

export type UpdateBotVisibilityRequest = {
  toPublic: boolean;
};

export type UpdateBotVisibilityResponse = null;

export type GetBotsRequest =
  | {
      kind: 'private';
      limit?: number;
    }
  | {
      kind: 'mixed';
      limit: number;
    }
  | {
      kind: 'mixed';
      pinned: boolean;
    };

export type GetBotsResponse = BotListItem[];

export type GetMyBotResponse = BotDetails;

export type GetBotSummaryResponse = BotSummary;

export type GetPublicBotResponse = BotDetails;

export type GetPresignedUrlResponse = {
  url: string;
};

export type GetBucketResponse = [];