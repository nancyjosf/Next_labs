'use client';

import { useActionState } from 'react';

async function submitFormAction(prevState: any, formData: FormData) {
  const id = formData.get('id');
  const title = formData.get('title');
  const price = formData.get('price');
  const method = id ? 'PUT' : 'POST';
  const endpoint = id ? `/api/products/${id}` : '/api/products';

  try {
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price: Number(price) }),
    });
    if (res.ok) return { success: true, feedback: "Product synced flawlessly!" };
    return { success: false, feedback: "Failed to upload product." };
  } catch {
    return { success: false, feedback: "Network error occurred." };
  }
}

export default function ProductForm({ existingItem }: { existingItem?: any }) {
  const [state, formAction, isPending] = useActionState(submitFormAction, null);

  return (
    <form
      action={formAction}
      style={{
        padding: '15px',
        border: '1px solid #cbd5e0',
        borderRadius: '5px',
      }}
    >
      {existingItem?.id && (
        <input type="hidden" name="id" value={existingItem.id} />
      )}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="title"
          defaultValue={existingItem?.title || ''}
          placeholder="Product Title"
          required
          style={{ width: '100%', padding: '6px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          name="price"
          defaultValue={existingItem?.price || ''}
          placeholder="Price"
          required
          style={{ width: '100%', padding: '6px' }}
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        style={{
          backgroundColor: '#2b6cb0',
          color: 'white',
          padding: '6px 12px',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {isPending ? 'Processing...' : 'Submit Form'}
      </button>
      {state && (
        <p
          style={{
            color: state.success ? 'green' : 'red',
            fontSize: '10pt',
            marginTop: '8px',
          }}
        >
          {state.feedback}
        </p>
      )}
    </form>
  );
}
