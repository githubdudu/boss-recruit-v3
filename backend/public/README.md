# Static Files Directory

This directory contains all static assets served by the Express server.

## Directory Structure

```
public/
├── images/
│   ├── avatars/          # User avatar images
│   │   ├── recruiter1.jpg
│   │   ├── recruiter2.jpg
│   │   ├── applicant1.jpg
│   │   └── ...
│   └── ...               # Other images (logos, banners, etc.)
├── uploads/              # User-uploaded files
└── README.md
```

## How it Works

- Express is configured with `app.use(express.static("public"))` in `src/app.js`
- Files are accessible via HTTP at: `http://localhost:3000/[file-path]`
- For example: `public/images/avatars/recruiter1.jpg` → `http://localhost:3000/images/avatars/recruiter1.jpg`

## Avatar Images

To use the avatar paths in your database:
- Store relative paths like: `/images/avatars/recruiter1.jpg`
- Frontend can construct full URLs: `${baseUrl}/images/avatars/recruiter1.jpg`

## Uploading Files

The `uploads/` directory is intended for user-uploaded files. You can implement file upload endpoints that save files here.

## Image Guidelines

- Use web-optimized formats (JPEG, PNG, WebP)
- Keep file sizes reasonable (< 1MB for avatars)
- Use descriptive filenames
- Consider implementing image resizing for avatars
