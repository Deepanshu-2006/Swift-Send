import * as React from 'react';

export const EmailTemplate = ({
    userName = 'Someone',
    fileName = 'file',
    fileSize = 0,
    fileType = 'unknown',
    shortUrl = '#',
    message = ''
}) => {
    const sizeInMB = (fileSize / 1024 / 1024).toFixed(2);
    const bannerUrl = "https://www.adorama.com/alc/wp-content/uploads/2020/10/abstract-photography-design-feature.jpg";

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            backgroundColor: '#f8fafc',
            padding: '40px 20px',
            color: '#334155',
            lineHeight: '1.6'
        }}>
            <div style={{
                maxWidth: '540px',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)'
            }}>
                {/* Banner Header Image */}
                {bannerUrl && (
                    <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
                        <img 
                            src={bannerUrl} 
                            alt="Shared File Header" 
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                )}

                {/* Email Body Container */}
                <div style={{ padding: '36px 32px' }}>
                    {/* Brand Header */}
                    <div style={{ display: 'table', margin: '0 0 28px 0' }}>
                        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                                textAlign: 'center',
                                lineHeight: '36px',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}>
                                S
                            </div>
                        </div>
                        <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingLeft: '8px' }}>
                            <span style={{
                                fontSize: '20px',
                                fontWeight: '800',
                                color: '#0f172a',
                                letterSpacing: '-0.025em'
                            }}>
                                Swift Send
                            </span>
                        </div>
                    </div>

                    {/* Greeting */}
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#1e293b',
                        margin: '0 0 12px 0'
                    }}>
                        You've received a file!
                    </h2>
                    
                    <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 24px 0' }}>
                        Hello there, <br />
                        <strong>{userName}</strong> has shared a file with you securely using Swift Send.
                    </p>

                    {/* Personal Message Card */}
                    {message && (
                        <div style={{
                            padding: '16px 20px',
                            backgroundColor: '#f0fdf4',
                            borderLeft: '4px solid #22c55e',
                            borderRadius: '8px',
                            marginBottom: '28px'
                        }}>
                            <p style={{
                                fontSize: '11px',
                                fontWeight: '700',
                                color: '#166534',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                margin: '0 0 6px 0'
                            }}>
                                Message from sender:
                            </p>
                            <p style={{
                                fontSize: '14.5px',
                                fontStyle: 'italic',
                                color: '#166534',
                                margin: '0',
                                lineHeight: '22px'
                            }}>
                                "{message}"
                            </p>
                        </div>
                    )}

                    {/* File Box */}
                    <div style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '32px'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '48px', verticalAlign: 'top', paddingRight: '12px' }}>
                                        <div style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '10px',
                                            backgroundColor: '#e0f2fe',
                                            textAlign: 'center'
                                        }}>
                                            <span style={{ fontSize: '20px', lineHeight: '44px' }}>📁</span>
                                        </div>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <p style={{
                                            fontSize: '15px',
                                            fontWeight: '700',
                                            color: '#0f172a',
                                            margin: '0',
                                            wordBreak: 'break-all'
                                        }}>
                                            {fileName}
                                        </p>
                                        <p style={{
                                            fontSize: '13px',
                                            color: '#64748b',
                                            margin: '4px 0 0 0'
                                        }}>
                                            {fileType} • {sizeInMB} MB
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* CTA Button */}
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <a href={shortUrl} style={{
                            display: 'inline-block',
                            backgroundColor: '#3b82f6',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            padding: '14px 32px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                        }}>
                            Access Shared File
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    backgroundColor: '#f8fafc',
                    padding: '24px 32px',
                    borderTop: '1px solid #f1f5f9',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        margin: '0 0 8px 0',
                        lineHeight: '16px'
                    }}>
                        This email was sent securely via Swift Send.
                    </p>
                    <p style={{
                        fontSize: '11px',
                        color: '#cbd5e1',
                        margin: '0',
                        lineHeight: '16px'
                    }}>
                        If you were not expecting this file share, you can safely ignore this email.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplate;