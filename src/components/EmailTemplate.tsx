import * as React from "react";
import { FormType } from "@/types/form";

interface EmailTemplateProps {
  form: FormType;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  form,
}) => (
  <table style={{ width: "100%", padding: "2rem 0" }}>
    <tbody>
      <tr>
        <td>
          <p style={{ fontWeight: 600 }}>Name:</p>
        </td>
        <td>
          <p>{form.name}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p style={{ fontWeight: 600 }}>Email:</p>
        </td>
        <td>
          <p>{form.email}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p style={{ fontWeight: 600 }}>Number:</p>
        </td>
        <td>
          <p>{form.number}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p style={{ fontWeight: 600 }}>Age:</p>
        </td>
        <td>
          <p>{form.age}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p style={{ fontWeight: 600 }}>Call Type:</p>
        </td>
        <td>
          <p>{form.callType}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p style={{ fontWeight: 600 }}>City:</p>
        </td>
        <td>
          <p>{form.city}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p style={{ fontWeight: 600 }}>Date:</p>
        </td>
        <td>
          <p>{form.date}</p>
        </td>
      </tr>
      <tr>
        <td>
          <p style={{ fontWeight: 600 }}>Rate:</p>
        </td>
        <td>
          <p>{form.rate}</p>
        </td>
      </tr>
    </tbody>
  </table>
);
