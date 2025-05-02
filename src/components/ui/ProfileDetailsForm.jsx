'use client';

import { useState } from 'react';

export default function ProfileDetailsForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="w-full max-w-[728px] mx-auto mt-6 px-4 sm:px-6 space-y-6 font-instrument">
      <h2 className="text-[32px] font-bold leading-[48px] text-[#333]">Profile Details</h2>
      <p className="text-base leading-[24px] text-[#737373]">
        Add your personal details to customize your profile.
      </p>

      {/* First Name */}
      <div>
        <label className="block text-sm text-[#737373] mb-1">First Name</label>
        <input
          name="firstName"
          type="text"
          placeholder="John"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm placeholder:text-gray-400"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm text-[#737373] mb-1">Last Name</label>
        <input
          name="lastName"
          type="text"
          placeholder="Appleseed"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm placeholder:text-gray-400"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-[#737373] mb-1">Email</label>
        <input
          name="email"
          type="email"
          placeholder="john@email.com"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm placeholder:text-gray-400"
        />
      </div>

      {/* Save Button */}
      <div className="pt-6 border-t border-[#D9D9D9]">
        <div className="flex justify-center md:justify-end">
          <button
            type="submit"
            className="w-[311px] md:w-[91px] h-[46px] px-[27px] py-[11px] rounded-lg text-white text-base font-semibold leading-[24px] font-instrument bg-violet-600 hover:bg-violet-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
