import axios from 'axios';
import toast from 'react-hot-toast';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const WHATSAPP_API_URL = import.meta.env.VITE_WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';
const WHATSAPP_TOKEN = import.meta.env.VITE_WHATSAPP_TOKEN || '';

// Create axios instance with CORS headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});

// WhatsApp API instance
const whatsappApi = axios.create({
  baseURL: WHATSAPP_API_URL,
  headers: {
    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Types
export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  contribution: number;
  status: 'active' | 'pending' | 'overdue';
  lastPayment: string;
  totalPaid: number;
  joinDate: string;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'upcoming';
  method?: string;
  reference?: string;
}

export interface Reminder {
  id: string;
  name: string;
  template: string;
  frequency: 'weekly' | 'monthly' | 'once';
  nextSend: string;
  recipients: number;
  status: 'active' | 'paused';
}

export interface Settings {
  chamaName: string;
  defaultContribution: number;
  paymentDueDay: number;
  currency: string;
  timezone: string;
  whatsappBusinessName: string;
  welcomeMessage: string;
  autoResponse: boolean;
  readReceipts: boolean;
  mpesaBusinessNumber: string;
  bankAccountDetails: string;
}

// API Functions
export const apiService = {
  // Members API
  async getMembers(): Promise<Member[]> {
    try {
      const response = await api.get('/members');
      return response.data;
    } catch (error) {
      console.error('Error fetching members:', error);
      // Return mock data for demo
      return [
        {
          id: '1',
          name: 'Jane Wanjiku',
          phone: '+254712345678',
          email: 'jane.wanjiku@email.com',
          contribution: 5000,
          status: 'active',
          lastPayment: '2024-01-15',
          totalPaid: 45000,
          joinDate: '2023-02-10'
        },
        {
          id: '2',
          name: 'Peter Kimani',
          phone: '+254723456789',
          email: 'peter.kimani@email.com',
          contribution: 5000,
          status: 'pending',
          lastPayment: '2023-12-15',
          totalPaid: 40000,
          joinDate: '2023-01-15'
        }
      ];
    }
  },

  async addMember(member: Omit<Member, 'id'>): Promise<Member> {
    try {
      const response = await api.post('/members', member);
      toast.success('Member added successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to add member');
      throw error;
    }
  },

  async updateMember(id: string, member: Partial<Member>): Promise<Member> {
    try {
      const response = await api.put(`/members/${id}`, member);
      toast.success('Member updated successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to update member');
      throw error;
    }
  },

  async deleteMember(id: string): Promise<void> {
    try {
      await api.delete(`/members/${id}`);
      toast.success('Member deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete member');
      throw error;
    }
  },

  // Payments API
  async getPayments(): Promise<Payment[]> {
    try {
      const response = await api.get('/payments');
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      // Return mock data for demo
      return [
        {
          id: '1',
          memberId: '1',
          memberName: 'Jane Wanjiku',
          amount: 5000,
          dueDate: '2024-01-15',
          paidDate: '2024-01-15',
          status: 'paid',
          method: 'M-Pesa',
          reference: 'REF001'
        }
      ];
    }
  },

  async recordPayment(payment: Omit<Payment, 'id'>): Promise<Payment> {
    try {
      const response = await api.post('/payments', payment);
      toast.success('Payment recorded successfully!');
      
      // Send WhatsApp confirmation
      await this.sendWhatsAppMessage(
        payment.memberId,
        `Great news! ✅ We've received your payment of KES ${payment.amount.toLocaleString()}. Thank you for keeping our chama strong! 🙌`
      );
      
      return response.data;
    } catch (error) {
      toast.error('Failed to record payment');
      throw error;
    }
  },

  async markPaymentAsPaid(paymentId: string, method: string, reference: string): Promise<void> {
    try {
      await api.put(`/payments/${paymentId}/mark-paid`, {
        paidDate: new Date().toISOString(),
        method,
        reference,
        status: 'paid'
      });
      toast.success('Payment marked as paid!');
    } catch (error) {
      toast.error('Failed to mark payment as paid');
      throw error;
    }
  },

  // Reminders API
  async getReminders(): Promise<Reminder[]> {
    try {
      const response = await api.get('/reminders');
      return response.data;
    } catch (error) {
      console.error('Error fetching reminders:', error);
      return [];
    }
  },

  async createReminder(reminder: Omit<Reminder, 'id'>): Promise<Reminder> {
    try {
      const response = await api.post('/reminders', reminder);
      toast.success('Reminder created successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to create reminder');
      throw error;
    }
  },

  async sendReminder(reminderId: string): Promise<void> {
    try {
      await api.post(`/reminders/${reminderId}/send`);
      toast.success('Reminders sent successfully!');
    } catch (error) {
      toast.error('Failed to send reminders');
      throw error;
    }
  },

  // Settings API
  async getSettings(): Promise<Settings> {
    try {
      const response = await api.get('/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Return default settings
      return {
        chamaName: 'Unity Savings Group',
        defaultContribution: 5000,
        paymentDueDay: 15,
        currency: 'KES',
        timezone: 'Africa/Nairobi',
        whatsappBusinessName: 'Unity Savings Group Bot',
        welcomeMessage: 'Welcome to Unity Savings Group! I\'m here to help you with payment reminders and updates.',
        autoResponse: true,
        readReceipts: true,
        mpesaBusinessNumber: '123456',
        bankAccountDetails: 'Bank: KCB Bank\nAccount: 1234567890\nName: Unity Savings Group'
      };
    }
  },

  async updateSettings(settings: Partial<Settings>): Promise<Settings> {
    try {
      const response = await api.put('/settings', settings);
      toast.success('Settings updated successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to update settings');
      throw error;
    }
  },

  // WhatsApp API
  async sendWhatsAppMessage(memberId: string, message: string): Promise<void> {
    try {
      // Get member phone number
      const members = await this.getMembers();
      const member = members.find(m => m.id === memberId);
      
      if (!member) {
        throw new Error('Member not found');
      }

      const phoneNumber = member.phone.replace('+', '');
      
      await whatsappApi.post(`/${import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: message
        }
      });
      
      console.log('WhatsApp message sent successfully');
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      // Don't throw error to prevent blocking other operations
    }
  },

  async sendBulkReminders(memberIds: string[], template: string): Promise<void> {
    try {
      const members = await this.getMembers();
      const promises = memberIds.map(async (memberId) => {
        const member = members.find(m => m.id === memberId);
        if (member) {
          const personalizedMessage = template
            .replace('{name}', member.name)
            .replace('{amount}', member.contribution.toLocaleString())
            .replace('{date}', new Date().toLocaleDateString());
          
          await this.sendWhatsAppMessage(memberId, personalizedMessage);
        }
      });
      
      await Promise.all(promises);
      toast.success('Bulk reminders sent successfully!');
    } catch (error) {
      toast.error('Failed to send bulk reminders');
      throw error;
    }
  },

  // Export Functions
  async exportToPDF(data: any[], title: string): Promise<void> {
    try {
      const { jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');
      
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text(title, 20, 20);
      
      // Add date
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
      
      // Add table
      if (data.length > 0) {
        const columns = Object.keys(data[0]).map(key => ({ header: key, dataKey: key }));
        
        autoTable(doc, {
          columns,
          body: data,
          startY: 40,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [59, 130, 246] }
        });
      }
      
      doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      toast.success('PDF exported successfully!');
    } catch (error) {
      toast.error('Failed to export PDF');
      throw error;
    }
  },

  async exportToExcel(data: any[], filename: string): Promise<void> {
    try {
      const XLSX = await import('xlsx');
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, `${filename}.xlsx`);
      toast.success('Excel file exported successfully!');
    } catch (error) {
      toast.error('Failed to export Excel file');
      throw error;
    }
  }
};

export default apiService;