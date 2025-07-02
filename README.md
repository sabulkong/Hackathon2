# ChamaPay Bot - Smart Payment Management System

A comprehensive WhatsApp bot and web dashboard for managing chama (savings group) payments, reminders, and member interactions.

## 🚀 Features

### ✅ Core Functionality
- **Member Management**: Add, edit, delete members with full CRUD operations
- **Payment Tracking**: Record payments, mark as paid, track payment history
- **WhatsApp Bot Integration**: Automated reminders and interactive conversations
- **Smart Reminders**: Scheduled payment reminders with personalized messages
- **Real-time Notifications**: Browser notifications for important events
- **Reports & Analytics**: Generate PDF/Excel reports with detailed insights
- **Settings Management**: Configurable bot settings and preferences

### 🤖 WhatsApp Bot Features
- Automated payment reminders
- Interactive member responses ("Paid", balance queries)
- Bulk message broadcasting
- Payment confirmations
- Overdue payment alerts
- Customizable message templates

### 📊 Dashboard Features
- Real-time payment tracking
- Member status monitoring
- Collection rate analytics
- Payment progress visualization
- Top performers and defaulters tracking
- Exportable reports (PDF/Excel)

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **PDF Generation**: jsPDF with autoTable
- **Excel Export**: XLSX
- **WhatsApp API**: Meta WhatsApp Business API
- **State Management**: React Hooks
- **Build Tool**: Vite

## 📋 Prerequisites

1. **WhatsApp Business API Access**
   - Meta Business Account
   - WhatsApp Business API credentials
   - Phone number verification

2. **Backend Setup** (Choose one)
   - Firebase project with Firestore
   - Airtable workspace
   - Custom Node.js API server

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd chamabot-system
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# WhatsApp Business API
VITE_WHATSAPP_TOKEN=your_access_token
VITE_WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id

# Backend API
VITE_API_BASE_URL=your_api_endpoint

# Database (Firebase or Airtable)
VITE_FIREBASE_API_KEY=your_firebase_key
# OR
VITE_AIRTABLE_API_KEY=your_airtable_key
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 🔧 Configuration

### WhatsApp Business API Setup

1. **Create Meta Business Account**
   - Go to [Meta Business](https://business.facebook.com)
   - Create a new business account

2. **Set up WhatsApp Business API**
   - Navigate to Meta for Developers
   - Create a new app with WhatsApp Business API
   - Get your access token and phone number ID

3. **Configure Webhooks**
   - Set webhook URL for receiving messages
   - Subscribe to message events

### Database Setup

#### Option A: Firebase
1. Create Firebase project
2. Enable Firestore database
3. Set up authentication (optional)
4. Add Firebase config to `.env`

#### Option B: Airtable
1. Create Airtable workspace
2. Set up tables for members, payments, reminders
3. Get API key and base ID
4. Add Airtable config to `.env`

## 📱 WhatsApp Bot Commands

### Member Commands
- `balance` - Check payment balance
- `paid [amount]` - Confirm payment
- `help` - Get help information
- `status` - Check membership status

### Admin Commands
- `send reminder` - Send payment reminders
- `member stats` - Get member statistics
- `collection report` - Get collection summary

## 🔐 Security Features

- CORS protection for API calls
- Input validation and sanitization
- Secure environment variable handling
- Rate limiting for API requests
- Data encryption for sensitive information

## 📊 API Endpoints

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Add new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Record payment
- `PUT /api/payments/:id/mark-paid` - Mark as paid

### Reminders
- `GET /api/reminders` - Get reminders
- `POST /api/reminders` - Create reminder
- `POST /api/reminders/:id/send` - Send reminder

### WhatsApp
- `POST /api/whatsapp/send` - Send message
- `POST /api/whatsapp/broadcast` - Broadcast message

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel Deployment
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Custom Server
1. Build: `npm run build`
2. Serve `dist` folder with web server
3. Configure reverse proxy if needed

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure API server has proper CORS headers
   - Check environment variables

2. **WhatsApp API Issues**
   - Verify access token validity
   - Check phone number verification
   - Ensure webhook is properly configured

3. **Database Connection**
   - Verify API keys and credentials
   - Check network connectivity
   - Ensure proper permissions

### Debug Mode
Enable debug logging by setting:
```env
VITE_DEBUG=true
```

## 📈 Performance Optimization

- Lazy loading for components
- Image optimization
- Bundle splitting
- Caching strategies
- API response optimization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@chamabot.com
- Documentation: [docs.chamabot.com](https://docs.chamabot.com)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic member management
- ✅ Payment tracking
- ✅ WhatsApp integration
- ✅ Report generation

### Phase 2 (Next)
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Integration with mobile money APIs

### Phase 3 (Future)
- [ ] AI-powered insights
- [ ] Loan management
- [ ] Investment tracking
- [ ] Multi-chama support

---

**ChamaPay Bot** - Empowering chamas with smart payment management! 🚀