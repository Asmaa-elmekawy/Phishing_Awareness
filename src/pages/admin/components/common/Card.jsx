import React from 'react';

const Card = ({ children, title, subtitle, footer, className = '', contentClassName = '' }) => {
    return (
        <div className={`bg-cyber-surface rounded-xl border border-cyber-border overflow-hidden flex flex-col ${className}`}>
            {(title || subtitle) && (
                <div className="p-5 border-b border-cyber-border">
                    {title && <h3 className="text-lg font-semibold text-cyber-text">{title}</h3>}
                    {subtitle && <p className="text-sm text-cyber-text-muted mt-1">{subtitle}</p>}
                </div>
            )}

            <div className={`p-5 flex-1 ${contentClassName}`}>
                {children}
            </div>

            {footer && (
                <div className="px-5 py-4 bg-black/5 border-t border-cyber-border">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
