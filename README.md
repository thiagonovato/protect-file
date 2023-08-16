# API Upload Files

Welcome to the repository of the Upload and Token Generation API! This API was developed with the goal of allowing file uploads and generating tokens to ensure secure access to the uploaded files. By generating tokens containing a unique hash and an expiration date, it's possible to efficiently and reliably control access to the files.

### Key Features

**File Upload**: The API allows users to upload files to the server. This is useful for storing and sharing various types of files, such as documents, images, and more.

**Token Generation**: After the file upload, the API generates a unique token containing a hash associated with the file and an expiration date. This token is essential for validating authenticity and accessing the file.

###### This is a Heading h6

### API Endpoints

The API exposes the following endpoints:

1. **GET /files**: Lists all database files.
2. **GET /files/{token}**: When querying the files, a token will be returned for each file. This token has a HASH code that identifies the file in the database and an expiration date. This endpoint needs this token to validate expiration and to validate file existence.
3. **POST /files/upload**: Allows uploading files

### Running the project

Start database

```
docker-compose up
```

Start api

```
npm run:dev
```

## Developed by

Thiago Novato
thiagonovato.dev
thiago@thiagonovato.dev
