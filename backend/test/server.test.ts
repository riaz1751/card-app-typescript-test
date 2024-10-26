import { server } from "../src/server"
import Prisma from "../src/db";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

describe("Test API", () => {
  let testEntryId: string;

  beforeAll(async () => {
    await server.ready();
  });

  afterAll(async () => {
    await server.close(); // Close the server after tests
  });

  // Create a new entry for tests
  beforeEach(async () => {
    const testEntry = await Prisma.entry.create({
      data: {
        title: "Initial Test Entry",
        description: "This is a test entry for setup",
        created_at: new Date(),
        schedule_at: new Date(),
      },
    });
    testEntryId = testEntry.id;
  });

  afterEach(async () => {
    // Check if entry exists so it can be deleted
    const entryExists = await Prisma.entry.findUnique({ where: { id: testEntryId } });
    if (entryExists) {
      await Prisma.entry.delete({ where: { id: testEntryId } });
    }
  });

  it("should create a new entry", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: {
        title: "Test Entry",
        description: "This is a test entry",
        created_at: new Date(),
        schedule_at: new Date(),
      },
    });

    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.body);
    expect(data.title).toBe("Test Entry");
  });

  it("should retrieve all entries", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);
    const entries = JSON.parse(response.body);
    expect(Array.isArray(entries)).toBe(true);
  });

  it("should retrieve a single entry by id", async () => {
    const response = await server.inject({
      method: "GET",
      url: `/get/${testEntryId}`,
    });

    expect(response.statusCode).toBe(200);
    const entry = JSON.parse(response.body);
    expect(entry).toHaveProperty("id", testEntryId);
    expect(entry).toHaveProperty("title", "Initial Test Entry");
  });

  it("should update an entry by id", async () => {
    const updateData = {
      title: "Updated Title",
      description: "Updated Description",
      created_at: new Date(),
      schedule_at: new Date(),
    };

    const response = await server.inject({
      method: "PUT",
      url: `/update/${testEntryId}`,
      payload: updateData,
    });

    expect(response.statusCode).toBe(200);
    const message = JSON.parse(response.body);
    expect(message.msg).toBe("Updated successfully");

    // Verify update in database
    const updatedEntry = await Prisma.entry.findUnique({
      where: { id: testEntryId },
    });
    expect(updatedEntry).toHaveProperty("title", "Updated Title");
  });

  it("should delete an entry by id", async () => {
    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${testEntryId}`,
    });

    expect(response.statusCode).toBe(200);
    const message = JSON.parse(response.body);
    expect(message.msg).toBe("Deleted successfully");

    // Verify deletion from database
    const deletedEntry = await Prisma.entry.findUnique({
      where: { id: testEntryId },
    });
    expect(deletedEntry).toBeNull();
  });
});

