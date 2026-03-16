export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;

    if (!token || !baseId || !tableName) {
      return Response.json(
        {
          error:
            "Missing env vars. Check AIRTABLE_TOKEN, AIRTABLE_BASE_ID, and AIRTABLE_TABLE_NAME.",
        },
        { status: 500 }
      );
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Email: email,
                "Created At": new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );

    const data = await airtableRes.json();

    if (!airtableRes.ok) {
      console.error("AIRTABLE ERROR:", data);
      return Response.json(
        {
          error:
            data?.error?.message ||
            data?.error?.type ||
            JSON.stringify(data) ||
            "Airtable request failed.",
        },
        { status: airtableRes.status }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}