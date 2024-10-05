package org.example.api.repository;

import org.example.api.dto.WalletTransactionDTO;
import org.example.api.entity.Wallettransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WallettransactionRepository extends JpaRepository<Wallettransaction, Long> {

    List<Wallettransaction> findByWallet_WalletId(Long walletId);

//    @Query("SELECT w FROM Wallettransaction w GROUP BY w.wallet.walletId ORDER BY SUM(w.amount) DESC")
//    List<Wallettransaction> findTotalAmountByWallet();

    @Query("SELECT new org.example.api.dto.WalletTransactionDTO(w.wallet.walletId, SUM(w.amount), u.fullName) " +
            "FROM Wallettransaction w " +
            "JOIN w.wallet.user u " + // Thực hiện join với đối tượng người dùng
            "GROUP BY w.wallet.walletId, u.fullName " +
            "ORDER BY SUM(w.amount) DESC")
    List<WalletTransactionDTO> findTotalAmountByWallet();
}
