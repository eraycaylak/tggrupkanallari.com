import Link from 'next/link';
import { Channel, formatMemberCount } from '@/lib/db';

interface ChannelCardProps {
  channel: Channel;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <article className="channel-card">
      <div className="channel-card-header">
        <span className={`channel-card-platform ${channel.platform}`}>
          {channel.platform === 'whatsapp' ? '📱 WhatsApp' : '✈️ Telegram'}
        </span>
        {channel.verified && (
          <span className="channel-card-verified" title="Doğrulanmış Kanal">✓</span>
        )}
      </div>

      <h3 className="channel-card-title">
        <Link href={`/kanal/${channel.slug}`}>
          {channel.name}
        </Link>
      </h3>

      <p className="channel-card-desc">{channel.description}</p>

      <div className="channel-card-tags">
        {channel.tags.slice(0, 3).map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="channel-card-meta">
        <span className="channel-card-members">
          👥 {formatMemberCount(channel.memberCount)} üye
        </span>
        <a
          href={channel.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`channel-card-join ${channel.platform}`}
        >
          Katıl →
        </a>
      </div>
    </article>
  );
}
