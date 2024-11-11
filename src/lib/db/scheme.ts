export const scheme = `
  CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      summary TEXT,
      feature_image TEXT,
      feature_image_alt TEXT,
      keywords TEXT,
      published BOOLEAN DEFAULT false,
      view_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      parent_id INTEGER,
      order_index INTEGER DEFAULT 0,
      is_visible BOOLEAN DEFAULT true,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS post_categories (
      post_id INTEGER,
      category_id INTEGER,
      PRIMARY KEY (post_id, category_id),
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE VIRTUAL TABLE IF NOT EXISTS posts_fts USING fts5(
      title,
      content,
      keywords,
      content='posts',
      tokenize='porter unicode61'
  );

  CREATE TRIGGER posts_ai AFTER INSERT ON posts BEGIN
    INSERT INTO posts_fts(rowid, title, content, keywords)
    VALUES (new.id, new.title, new.content, new.keywords);
  END;

  CREATE TRIGGER posts_ad AFTER DELETE ON posts BEGIN
    INSERT INTO posts_fts(posts_fts, rowid, title, content, keywords)
    VALUES('delete', old.id, old.title, old.content, old.keywords);
  END;

  CREATE TRIGGER posts_au AFTER UPDATE ON posts BEGIN
    INSERT INTO posts_fts(posts_fts, rowid, title, content, keywords)
    VALUES('delete', old.id, old.title, old.content, old.keywords);
    INSERT INTO posts_fts(rowid, title, content, keywords)
    VALUES (new.id, new.title, new.content, new.keywords);
  END;
`;
